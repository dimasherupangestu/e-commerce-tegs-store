import axios from "axios";
import { DeliveryRequest } from "../model/delivery-model";

export class RajaOngkirService {
    static async getCityId(cityName: string): Promise<number | null> {
        const response = await axios.get('https://api.rajaongkir.com/starter/city', {
            headers: {
                key: process.env.API_KEY_RAJA_ONGKIR
            }
        });

        const cities = response.data.rajaongkir.results;
        // console.log(cities)
        const city = cities.find((c: any) => {
            return c.city_name.toLowerCase() === cityName.toLowerCase();
        });

        return city ? parseInt(city.city_id, 10) : null; 
    }

    static async calculateShippingCost(request: DeliveryRequest): Promise<any> {
        try {
        const ORIGIN_CITY_ID = process.env.ORIGIN_CITY_ID;

        const response = await axios.post('https://api.rajaongkir.com/starter/cost',{
            origin: ORIGIN_CITY_ID,
            destination: request.destination,
            weight: request.weight,
            courier: request.courier
        }, {
            headers: {
                key: process.env.API_KEY_RAJA_ONGKIR,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        return response.data
        } catch (error) {
            console.log(error)
        }
        
    }
}