import { Box, Flex, HStack, Image, Text } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { IProductDetail } from "../types/product-detail";
import { Link } from "react-router-dom";

export const CardShop = ({ id, image, ...item }: IProductDetail) => {
  return (
    <>
      <Box w={"100%"} h={"100%"} mx={"auto"}>
        <Link to={`/product-detail/${id}`}>
          <Box
            key={id}
            w={{ base: "100%", md: "80%", lg: "15rem", xl: "17rem" }}
            h={{ base: "80%", md: "100%", lg: "21rem", xl: "23rem" }}
            borderRadius={"10px"}
            _hover={{ cursor: "pointer", boxShadow: "xl",  }}
            border={"1px solid #ddd"}
            mx={"auto"}
            pb={3}
            overflow={"hidden"}
          >
            <Image
              src={Array.isArray(image) && image.length > 0 ? image[0] : ""}
              w={"100%"}
              h={"75%"}
              objectFit={"revert-layer"}
            ></Image>
            <Box px={2}>
              <Text
                fontFamily={"poppins"}
                // fontWeight={500}
                mt={2}
                fontSize={"0.8rem"}
                noOfLines={1}
              >
                {item.product_name}
              </Text>
              <HStack>
                <Text fontFamily={"poppins"} fontSize={"1rem"} fontWeight={700}>
                  Rp {item.price}
                </Text>
                <Flex flexDirection={"column"} ml={{ base: "auto", md: "auto" }}>
                  <Text ml={"auto"} fontSize={"0.7rem"} color={"#aaa"}>
                    Stock: {item.stock}
                  </Text>
                  <Text ml={"auto"} fontSize={"0.7rem"} color={"#aaa"}>
                    Terjual: {item.sales}
                  </Text>
                </Flex>
              </HStack>
              <HStack mt={1} pb={4}>
                <FaStar color="GOLD" />
                <Text fontSize={"0.7rem"} color={"GOLD"}>
                  {item.rating}
                </Text>
              </HStack>
            </Box>
          </Box>
        </Link>
      </Box>
    </>
  );
};
