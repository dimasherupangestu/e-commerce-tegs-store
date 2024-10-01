import { useEffect, useState } from "react";
import { API, APIWithToken } from "../../../libs/axios";
import { IProductDetail } from "../../../types/product-detail";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useProductDetail(productId: number) {
    const [productData, setProductData] = useState<IProductDetail>();
    const [productSimilarData, setProductSimilarData] = useState<IProductDetail[]>();
   const naviget = useNavigate();
    async function getProductDetail() {
        try {
            const response = await API.get(`/product-detail/${productId}`);
            setProductData(response.data.data);
        } catch (error) {
            console.log("Error getting product detail: ", error);
        }
    }

    async function getSimilarProduct() {
        try {
            const response = await API.get(`/products/${productId}/similar`);
            setProductSimilarData(response.data.data);
        } catch (error) {
            console.log("Error getting product detail: ", error);
        }
    }

    async function addToCart(productId: number, quantity: number, selectedSize: string, selectedColor: string, token: any) {
       if(!token) {
        toast.error("Please login first");
       return naviget('/login')
       }
        if (productId === undefined) {
            console.error("Product ID is undefined.");
            return;
        }
    
        try {
            const response = await APIWithToken.post('/shopping-cart', {
                product_id: productId,
                quantity: quantity,
                selectedSize: selectedSize,
                selectedColor: selectedColor
            });
            console.log(response.data);
            toast.success("Product added to cart");
        } catch (error) {
            console.error("Error adding to cart: ", error);
        }
    }
    

    useEffect(() => {
        if (productId) {
            getProductDetail();
            getSimilarProduct();
        }
    }, [productId]);

    return {
        productData,
        productSimilarData,
        addToCart
    }
}
