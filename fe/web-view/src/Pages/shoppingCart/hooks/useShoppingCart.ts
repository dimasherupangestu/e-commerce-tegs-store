import { useEffect, useState } from "react"
import { APIWithToken } from "../../../libs/axios"
import { ShoppingCartData } from "../../../types/IShoppingCart"

const useShoppingCart = () => {
    const [productsInShoppingCart, setProductsInShoppingCart] = useState<ShoppingCartData>({
        products: [],
        total: 0,
     
        user_email: ''  
    });
    console.log('total',productsInShoppingCart)

    const getShoppingCart = async() => {
        try {
            const response = await APIWithToken.get('/shopping-cart',)
            // console.log(response.data)
            setProductsInShoppingCart(response.data.data)
        } catch (error) {
            console.log("Error getting shopping cart: ", error)
        }
    }

    const handleUpdateChange = async (productId: number, newQuantity: number, selectedSize: string, selectedColor: string) => {
        try {
            const response = await APIWithToken.put(`/shopping-cart`, {
                product_id: productId,
                newQuantity: newQuantity,
                selectedSize: selectedSize,
                selectedColor: selectedColor
            })
            console.log(response.data)
            getShoppingCart()
        } catch (error) {
            console.log("Error getting shopping cart: ", error)
        }
    }

    const removeItem = async (productId: number) => {
        try {
            await APIWithToken.delete(`/shopping-cart`, {
                data: {
                    product_id: productId
                }
            })
            // console.log(response.data)
            setProductsInShoppingCart((prevState) => {
                const updatedProducts = prevState.products.filter((item) => item.products.id !== productId);
                const newTotal = updatedProducts.reduce((acc, item) => acc + item.sub_total, 0);
                return {
                  ...prevState,
                  products: updatedProducts,
                  total: newTotal
                };
            });
        } catch (error) {
            console.log("Error getting shopping cart: ", error)
        }
    }

    useEffect(() => {
        getShoppingCart()
    }, [])

    return {
        getShoppingCart,
        productsInShoppingCart,
        handleUpdateChange,
        removeItem
    }
}

export default useShoppingCart