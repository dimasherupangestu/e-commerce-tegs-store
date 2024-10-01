/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { API } from "../../../libs/axios";
import { IProductDetail } from "../../../types/product-detail";

const useRecommendedProducts = () => {
    const [recommendedProducts, setRecommendedProducts] = useState<IProductDetail[]>([]);

    useEffect(() => {
        const fetchRecommendedProducts = async () => {
            try {
                const response = await API.get("/products");
                setRecommendedProducts(response.data.data); 
            } catch (error: any) {
                console.error(error);
            } 
        };

        fetchRecommendedProducts();
    }, []);

    return { recommendedProducts };
};

export default useRecommendedProducts;
