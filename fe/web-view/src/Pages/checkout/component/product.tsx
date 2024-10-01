import { Box, Divider, Flex, Grid, Image, Text } from "@chakra-ui/react";
import useShoppingCart from "../../shoppingCart/hooks/useShoppingCart";

const Product = () => {
    const { productsInShoppingCart } = useShoppingCart();
    const { products, total } = productsInShoppingCart;
    // console.log(products)

    return (
        <Box>
            {/* Header */}
            <Grid 
                templateColumns="2fr 1fr 1fr 1fr" 
                gap={4} 
                mb={4} 
                p={4} 
                fontWeight="bold" 
                borderBottom="1px solid #ddd"
                pb={2}
            >
                <Text>Product</Text>
                <Text textAlign="center">Unit Price</Text>
                <Text textAlign="center">Quantity</Text>
                <Text textAlign="center">Total</Text>
            </Grid>
            
            {/* Product List */}
            <Box border="1px solid #ddd" p={4}>
                {products.map((item) => (
                    <Grid
                        key={item.products.id}
                        templateColumns="2fr 1fr 1fr 1fr"
                        gap={4}
                        alignItems="center"
                        mb={4}
                    >
                        {/* Product Details */}
                        <Flex alignItems="center" gap={4}>
                            <Image
                                src={item.products.image![0]}
                                width={70}
                                height={70}
                                alt="Product Image"
                            />
                            <Box>
                                <Text fontSize="md">{item.products.product_name}</Text>
                                <Text fontSize="sm">Size: {item.selectedSize}</Text>
                                <Text fontSize="sm">Color: {item.selectedColor}</Text>
                                <Text fontSize="sm">Weight: {item.products.weight! * item.quantity}</Text>
                            </Box>
                        </Flex>
                        
                        {/* Unit Price */}
                        <Text textAlign="center">Rp {item.products.price}</Text>
                        
                        {/* Quantity */}
                        <Text textAlign="center">{item.quantity}</Text>
                        
                        {/* Total */}
                        <Text textAlign="center">Rp {item.sub_total}</Text>
                    </Grid>
                ))}
                
                {/* Total Price */}
                <Divider orientation='horizontal' mt={4} mb={4} />
                <Flex justifyContent="flex-end">
                    <Text fontSize="lg">Total: Rp {total}</Text>
                </Flex>
            </Box>
        </Box>
    );
}

export default Product;
