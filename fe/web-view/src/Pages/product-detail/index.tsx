import { Box, Container, Flex, Text} from "@chakra-ui/react";
import ProductDetailComps from "./components/product-detail";
import InformationDescription from "./components/information-description";
import { useProductDetail } from "./hooks/product-detail";
import { Layout } from "../../Layout";
import { CoreuselDetail } from "./components/CoreuselDetail";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
    const { productId } = useParams<{ productId: string }>();
    const id = productId ? parseInt(productId, 10) : undefined;
    const { productData, productSimilarData } = useProductDetail(id!);
    console.log("similarProductData" + productSimilarData);
    return (
        <Layout >
            <Container maxW='container.xl'>
                <Box>
                    {/* Product Detail */}
                    <Box>
                        <ProductDetailComps 
                            id={productData?.id ?? 0}
                            product_name={productData?.product_name}
                            description={productData?.description}
                            stock={productData?.stock}
                            price={productData?.price}
                            size={productData?.size}
                            color={productData?.color}
                            image={productData?.image}
                            rating={productData?.rating}
                            category_id={productData?.category_id}
                        />
                    </Box>
                    {/* Information */}
                    <Box mt={"100px"}>
                        <InformationDescription 
                            description={productData?.description} 
                        />
                    </Box>
                    
                    {/* Similar Products */}
                    <Box>
                        <Flex flexDirection={"column"} mt={10}>
                            <Text fontSize={25} fontWeight={600}>You might also like</Text>
                            <Text color={"grey"}>SIMILAR PRODUCTS</Text>
                        </Flex>
                    </Box>
                    <Box w={"100%"} h={"100%"} mt={10}>
                        <CoreuselDetail />
                    </Box>
                </Box>
            </Container>
        </Layout>
    );
};
export default ProductDetail;
