import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Text,
} from "@chakra-ui/react";
import { Layout } from "../../Layout";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CardShop } from "../../components/CardShop";
import { IProductDetail } from "../../types/product-detail";
import useProductsResult from "../../store/useProductsResult";
import useSearch from "./hooks/useSearch";
import Pagination from "./components/Pagination";

export const SearchPage = () => {
  const { handlePageChange, searchParams } = useSearch();
  const productsResult = useProductsResult((state) => state.productsResult);

  const currentPage = searchParams.page;
  
  return (
    <Box w={"100%"} h={"100%"} minHeight={"100vh"}>
      <Layout>
        <Box w={"100%"} h={"100%"}>
          <Box
            w={"100%"}
            h={"2.5rem"}
            display={"flex"}
            alignItems={"center"}
            bg={"#F2F4F5"}
          >
            <Breadcrumb
              spacing="8px"
              w={"80%"}
              color={"#718096"}
              fontSize={"0.8rem"}
              mx={"auto"}
              separator={<FaChevronRight color="#718096" />}
            >
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>

              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">
                  Search
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </Box>

          <Box w={"90%"} h={"100%"} mx={"auto"}>
            <Text
              color={"#000"}
              mt={3}
              ml={6}
              fontSize={"1.2rem"}
              fontWeight={700}
            >
              Applied Filters :
            </Text>

            <Box
              w={"100%"}
              h={"100%"}
              my={4}
              display={"flex"}
              flexWrap={"wrap"}
              gap={4}
              justifyContent={"center"}
            >
              {productsResult?.data?.map((item: IProductDetail) => (
                <Box key={item.id} flexBasis={{ base: "100%", sm: "48%", md: "23%" }} mb={4}>
                  <CardShop {...item} />
                </Box>
              ))}

             <Box display={'flex'} flexWrap={'nowrap'}>
             <Pagination
                currentPage={currentPage}
                totalPages={productsResult.totalPages}
                onPageChange={handlePageChange} 
              />
             </Box>
            </Box>
          </Box>
        </Box>
      </Layout>
    </Box>
  );
};
