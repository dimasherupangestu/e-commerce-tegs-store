import { useParams } from "react-router-dom";
import { CardShop } from "../../components/CardShop";
import { Layout } from "../../Layout";
import useCategory from "../home/hooks/useCategory";
import { Box, Heading } from "@chakra-ui/react";

const CategoryPage = () => {
    const { categoryName } = useParams<{ categoryName: string }>();
    const { products } = useCategory(categoryName!);
    return (
        <>
            <Layout>
                <Heading textAlign={"center"} mt={5} mb={10}>Category : {categoryName}</Heading>
                <Box
                    w={"100%"}
                    h={{ base: "auto", md: "100%", lg: "auto", xl: "auto" }}
                    my={5}
                >
                    <Box w={"90%"} mx={"auto"}>
                        <Box
                            w={"100%"}
                            h={"100%"}
                            display={"flex"}
                            flexWrap={"wrap"}
                            justifyContent={"space-between"}
                            gap={4}
                            mt={4}
                        >
                            {products?.map((product) => (
                                <Box
                                    key={product.id}
                                    flexBasis={{ base: "100%", md: "48%", lg: "18%" }}
                                    flexGrow={1}
                                    flexShrink={1}
                                >
                                    <CardShop {...product} />
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Layout>
        </>
    );
};

export default CategoryPage;
