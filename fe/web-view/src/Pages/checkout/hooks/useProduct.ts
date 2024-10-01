import { IProductDetail } from './../../../types/product-detail';
import { API } from "../../../libs/axios";
import { useEffect, useState } from 'react';

export function useProductFromCart() {
    const [product, setProduct] = useState<IProductDetail[]>();
    async function getProduct() {
        try {
            const response = await API.get("/shopping-cart");
            console.log(response.data);
            setProduct(response.data);
        } catch (error) {
            console.log("Error getting proudct: ", error);
        }
    }

    useEffect(() => {
        getProduct();
    }, [])

    return {
        product
    }
}