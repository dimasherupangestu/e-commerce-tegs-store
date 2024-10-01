import { Product, Transaction, TransactionsItem, User } from "@prisma/client";

export type TransactionRespose = {
    id?: string | null;
    total: number | null;
    status: string;
    customer_name: string | null;
    customer_email: string | null;
    delivery_details: delivery_details | null;
    service_fee: number | null;
    snap_token: string | null;
    snap_redirect_url: string | null;
    payment_method: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    user_email: string;
    transactions_items?: {
        product_name: string | null;
        price: number | null;
        quantity: number | null;
    }[];
}

type delivery_details = {
    code: string;
    name: string;
    cost: {
        value: number;
        etd: string;
        note: string;
    }[];
}

export type CreateTransactionRequest = {
    user_email: string;
    total: number;
    status: string;
    customer_name: string;
    customer_email: string;
    snap_token: string;
    snap_redirect_url: string;
    payment_method: string;
    delivery_details: delivery_details;
    service_fee: number;
    created_at: Date;
    updated_at: Date;
}

export function toTransactionResponse(transaction: Transaction, transactionsItems: TransactionsItem[], user: User): TransactionRespose {
    const deliveryDetails: delivery_details = JSON.parse(transaction.delivery_details as string);
    return {
        id: transaction.id,
        total: transaction.total,
        status: transaction.status,
        customer_name: transaction.customer_name,
        customer_email: user.email,
        delivery_details: deliveryDetails,
        service_fee: transaction.service_fee,
        snap_token: transaction.snap_token,
        snap_redirect_url: transaction.snap_redirect_url,
        payment_method: transaction.payment_method,
        created_at: transaction.createad_at,
        updated_at: transaction.updated_at,
        user_email: user.email,
        transactions_items: transactionsItems.map(item => ({
            product_name: item.product_name,
            price: item.price,
            quantity: item.quantity
        }))
    };
}
