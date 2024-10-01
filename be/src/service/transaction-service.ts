import { User } from "@prisma/client";
import { TransactionRespose, CreateTransactionRequest, toTransactionResponse } from "../model/transaction_model";
import { Validation } from '../validation/validation';
import { TransactionValidation } from '../validation/transaction-validation';
import { ResponseError } from '../error/response.error';
import { ShoppingCartService } from './shopping-cart-service';
import { prismaClient } from '../application/database';
import { v4 as uuidv4 } from 'uuid';
import "dotenv/config";
import crypto from 'crypto';

export class TransactionService {
    static async createTransaction(user: User, request: CreateTransactionRequest): Promise<TransactionRespose> {
        const createTransactionRequest = Validation.validate(TransactionValidation.CREATE, request);

        const productsFromShoppingCartItem = await ShoppingCartService.get(user);
        if (productsFromShoppingCartItem.products.length === 0) {
            throw new ResponseError(400, "Shopping cart is empty");
        }

        const transaction_id = `TRX-${uuidv4()}`;
        const authString = Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString('base64');

        const deliveryFee = createTransactionRequest.delivery_details;
        const deliveryCost = (deliveryFee && deliveryFee.cost && deliveryFee.cost.length > 0) 
            ? Number(deliveryFee.cost[0].value) 
            : 0;

        const serviceFee = 5000;
        const gross_amount = productsFromShoppingCartItem.total + deliveryCost + serviceFee;

        const payload = {
            transaction_details: {
                order_id: transaction_id,
                gross_amount: gross_amount
            },
            item_details: [
                ...productsFromShoppingCartItem.products.map((product) => ({
                    id: product.products.id,
                    price: product.products.price,
                    quantity: product.quantity,
                    name: product.products.product_name
                })),
                {
                    id: 'delivery_fee',
                    price: deliveryCost,
                    quantity: 1,
                    name: 'Delivery Fee'
                },
                {
                    id: 'service_fee',
                    price: serviceFee,
                    quantity: 1,
                    name: 'Service Fee'
                }
            ],
            customer_details: {
                first_name: user.full_name,
                email: user.email
            },
            callbacks: {
                finish: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
                error: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transaction_id}`,
                pending: `${process.env.FRONT_END_URL}/order-status?transaction_id=${transaction_id}`
            }
        };

        const response = await fetch(`${process.env.MIDTRANS_APP_URL}/snap/v1/transactions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Basic ${authString}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.status !== 201) {
            throw new ResponseError(500, `Failed to create transaction: ${data.errors || 'Unknown error'}`);
        }   

        const transaction = await prismaClient.transaction.create({
            data: {
                id: transaction_id,
                total: productsFromShoppingCartItem.total,
                service_fee: serviceFee,
                delivery_details: JSON.stringify(deliveryFee),
                status: "PENDING_PAYMENT",
                customer_name: user.full_name!,
                customer_email: user.email,
                snap_token: data.token,
                snap_redirect_url: data.redirect_url,
                user: { connect: { email: user.email } },
            }
        });

        const transactionItems = await Promise.all(
            productsFromShoppingCartItem.products.map(async (product) => {
                return await prismaClient.transactionsItem.create({
                    data: {
                       id: uuidv4(),
                       product_name: product.products.product_name,
                       quantity: product.quantity,
                       price: product.products.price,
                       productId: product.products.id,
                       transaction_id: transaction.id
                   }
                });
            })
        );

        return toTransactionResponse(transaction, transactionItems, user);
    }

    static async getTransactionById(transactionId: string): Promise<any> {
        const transaction = await prismaClient.transaction.findUnique({
            where: {
                id: transactionId,
            },
            include: {
                product: true
            }
        });
        if (!transaction) {
            throw new ResponseError(404, "Transaction not found");
        }

        return transaction;
    }

    static async updateTransactionStatus(transaction_id: string, status: any, payment_method: string | null = null) {
        console.log(`Updating transaction ${transaction_id} to status ${status}`);
        try {
            const updatedTransaction = await prismaClient.transaction.update({
                where: {
                    id: transaction_id,
                },
                data: {
                    status,
                    payment_method: payment_method || null, 
                    updated_at: new Date(),
                },
            });
            console.log(`Transaction updated successfully: ${updatedTransaction}`);
            return {
                status: 200,
                data: updatedTransaction
            }
        } catch (error) {
            console.error(`Error updating transaction: ${error}`);
            throw error;
        }
    }

    static async updateStatusBasedOnMidtransResponse(transaction_id: string, data: any) {
        const hash = crypto.createHash('sha512')
            .update(`${transaction_id}${data.status_code}${data.gross_amount}${process.env.MIDTRANS_SERVER_KEY}`)
            .digest('hex');
    
        console.log(`Received Signature Key: ${data.signature_key}`);
        console.log(`Calculated Hash: ${hash}`);
    
        if (data.signature_key !== hash) {
            throw new ResponseError(400, "Invalid signature key");
        }
    
        let transactionStatus = data.transaction_status;
        let fraudStatus = data.fraud_status;
        let responseData = null;
    
        console.log(`Transaction Status: ${transactionStatus}`);
        console.log(`Fraud Status: ${fraudStatus}`);
    
        try {
            if (transactionStatus === "capture") {
                if (fraudStatus === "accept") {
                    responseData = await TransactionService.updateTransactionStatus(transaction_id, 'PAID', data.payment_type);
                } else {
                    responseData = await TransactionService.updateTransactionStatus(transaction_id, 'FAILED', data.payment_type);
                }
            } else if (transactionStatus === "settlement") {
                responseData = await TransactionService.updateTransactionStatus(transaction_id, 'PAID', data.payment_type);
            } else if (transactionStatus === "cancel" || transactionStatus === "deny" || transactionStatus === "expire") {
                responseData = await TransactionService.updateTransactionStatus(transaction_id, 'CANCELED');
            } else if (transactionStatus === "pending") {
                responseData = await TransactionService.updateTransactionStatus(transaction_id, 'PENDING_PAYMENT');
            } else {
                throw new ResponseError(400, `Unhandled transaction status: ${transactionStatus}`);
            }
        } catch (error) {
            console.error(`Error updating transaction status: ${error}`);
            throw error;
        }
    
        return {
            status: 'success',
            data: responseData
        };
    }
    

    static async trxNotif(data: any) {
        console.log('Received notification data:', data);
        const transactionId = data.order_id;
        if (!transactionId) {
            throw new ResponseError(400, "Order ID is required");
        }

        const transaction = await TransactionService.getTransactionById(transactionId);

        if (!transaction) {
            throw new ResponseError(404, `Transaction with ID ${transactionId} not found`);
        }
        console.log('Transaction before update:', transaction);

        return TransactionService.updateStatusBasedOnMidtransResponse(transactionId, data);
    }

    static getAllTransaction = async (user: User) => {
        const transactions = await prismaClient.transaction.findMany({
            where: {
                user: {
                    email: user.email
                }
            },
            orderBy: {
                createad_at: 'desc'
            },
            include: {
                product: true
            }
        });
        return transactions
    }
}
