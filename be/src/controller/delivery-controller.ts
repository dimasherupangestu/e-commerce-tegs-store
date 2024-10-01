import { NextFunction, Response } from "express";
import { UserRequest } from "../type/user-request";
import { RajaOngkirService } from "../service/delivery-service";
import { DeliveryRequest } from "../model/delivery-model";

export class RajaOngkirController {
    static async calculateShippingCost(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const request = req.body as DeliveryRequest;
            const response = await RajaOngkirService.calculateShippingCost(request);
            res.status(200).json({
                data: response
            })
        } catch (e) {
            next(e)
        }
    }
}