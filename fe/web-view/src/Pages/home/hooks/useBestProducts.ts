/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { API } from "../../../libs/axios";
import { IProductDetail } from "../../../types/product-detail";

const useBestProducts = () => {
    const [bestProducts, setBestProducts] = useState<IProductDetail[]>([]);

    useEffect(() => {
        const fetchBestProducts = async () => {
            try {
                const response = await API.get("/best-products");
                setBestProducts(response.data.data); 
            } catch (error: any) {
                console.error(error);
            } 
        };

        fetchBestProducts();
    }, []);

    return { bestProducts };
};

export default useBestProducts;
