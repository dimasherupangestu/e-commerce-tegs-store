import { useEffect, useState } from "react";
import { API } from "../../../libs/axios"
import { IProductDetail } from "../../../types/product-detail";

const useCategory = (categoryName: string) => {
    const [products, setProducts] = useState<IProductDetail[]>([]);
    async function getCategory() {
        try {
            const response = await API.get(`/categories/${categoryName}`);
            const data = response.data.data;

            if (Array.isArray(data) && data.length > 0) {
                setProducts(data[0].products);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCategory()
    }, [categoryName])

    return {
        getCategory,
        products
    }
}

export default useCategory