import { Box, Button, Center, Input, Text } from "@chakra-ui/react";
import { Layout } from "../../Layout";
import { GoHome } from "react-icons/go";
import { IoIosArrowForward } from "react-icons/io";
import { CartCard } from "./componnent/cartCard";
import useShoppingCart from "./hooks/useShoppingCart";
import { useNavigate } from "react-router-dom";

export const ShoppingCart = () => {
  const { productsInShoppingCart, handleUpdateChange, removeItem } = useShoppingCart();
  const { products, total } = productsInShoppingCart;
  const navigate = useNavigate();

  const handleSizeChange = (productId: number, newSize: string) => {
    const item = products.find(p => p.products.id === productId);
    if (item) {
      handleUpdateChange(productId, item.quantity, newSize, item.selectedColor);
    }
  };

  const handleColorChange = (productId: number, newColor: string) => {
    const item = products.find(p => p.products.id === productId);
    if (item) {
      handleUpdateChange(productId, item.quantity, item.selectedSize, newColor);
    }
  };

  return (
    <Box w={"100%"} h={"100%"} maxH={"100vh"}>
      <Layout>
        <Box p={3} display={"flex"} bg={"#F8F8F8"}>
          <Center ml={"120px"}>
            <GoHome fontSize={"21px"} />
            <Text ml={1} mr={2}>Home</Text>
            <IoIosArrowForward fontSize={"19px"} />
            <Text ml={1} color={"green"}>Shopping Cart</Text>
          </Center>
        </Box>

        <Box justifyContent={"center"} alignItems={"center"} display={"flex"} p={"5px"}>
          <Box mt={"50px"} height={"100%"} width={"70%"}>
            <Box display={"flex"} textAlign={"start"} boxShadow={"0 0 1px;"} p={"15px"}>
              <Text ml={"50px"}>Product</Text>
              <Text ml={"5rem"}>Price</Text>
              <Text ml={"5rem"}>Size</Text>
              <Text ml={"5rem"}>Color</Text>
              <Text ml={"5rem"}>Quantity</Text>
              <Text ml={"5rem"}>Subtotal</Text>
            </Box>
            {products.map((item) => (
              <CartCard
                key={item.products.id}
                image={item.products.image![0]}
                name={item.products.product_name}
                price={item.products.price}
                id={item.products.id}
                quantity={item.quantity}
                sub_total={item.sub_total}
                size={item.selectedSize}
                color={item.selectedColor}
                sizes={item.products.size}
                colors={item.products.color}
                onQuantityChange={handleUpdateChange}
                onSizeChange={handleSizeChange}
                onColorChange={handleColorChange}
                onRemoveItem={removeItem}
              />
            ))}
          </Box>
        </Box>

        <Box justifyContent={"center"} alignItems={"center"} display={"flex"}>
          <Box marginLeft={"100px"} marginRight={"100px"} mt={"50px"} height={"100%"} width={"70%"} display={"flex"}>
            <Input placeholder='Coupon Code' width={"250px"} mr={5} />
            <Button bg={"brand.primary"}>Apply Coupon</Button>
            <Box border={"1px"} width={"50%"} p={5} ml={"100px"} borderRadius={5}>
              <Text fontSize={"large"} mb={2}>Cart Total</Text>
              <Box borderBottom={"1px"} display={"flex"} justifyContent={"space-between"} mt={2} mb={1} paddingBottom={1}>
                <Text>Subtotal:</Text>
                <Text>Rp {total}</Text>
              </Box>
              <Box mt={2} display={"flex"} justifyContent={"space-between"}>
                <Text>Total:</Text>
                <Text>Rp {total}</Text>
              </Box>
              <Box display={"flex"} justifyContent={"center"} mt={5} onClick={() => navigate("/checkout")}> 
                <Button bg={"brand.primary"}>Proceed To Checkout</Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </Box>
  )
};
