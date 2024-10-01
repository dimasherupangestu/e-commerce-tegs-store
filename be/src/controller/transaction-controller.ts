import { Transaction } from '@prisma/client';
import { NextFunction, Response, Request } from "express";
import { UserRequest } from "../type/user-request";
import { TransactionService } from "../service/transaction-service";
import { CreateTransactionRequest } from "../model/transaction_model";

export class TransactionController {
    static async createTransaction (req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request: CreateTransactionRequest = req.body as CreateTransactionRequest;

            const response = await TransactionService.createTransaction(req.user!, request);

            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getTransactionById (req: UserRequest, res: Response, next: NextFunction) {
        try {
            const transactionId = req.params.transaction_id;
            const response = await TransactionService.getTransactionById(transactionId);

            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async trxNotif (req: Request, res: Response, next: NextFunction) {
        try {
            const data = req.body;
            const response = await TransactionService.trxNotif(data);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }

    static async getAllTransaction (req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await TransactionService.getAllTransaction(req.user!);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}