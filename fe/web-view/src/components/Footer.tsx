import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";
import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

export const Footer = () => {
  return (
    <Box
      as="footer"
      w={"100%"}
      h={"auto"}
      mt={10}
      mx={"auto"}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"center"}
      pb={5}
      // alignItems={"center"}
      bg={"#000"}
    >
      <Box mt={5} mx={"auto"}>
        <Image
          src="../../src/assets/img/logo2.png"
          w={"17rem"}
          h={"3.4rem"}
          mx={"auto"}
        />
        <Text
          color={"#8E8E8E"}
          fontSize={"0.7rem"}
          w={{ base: 300, md: 500, lg: 500 }}
          mt={2}
          textAlign={"center"}
        >
          Online Shop Tags Store, we create endless style possibilities by
          expanding our product range, from international products to coveted
          local products. We put you at the center.
          <Text fontWeight={600}>Bersama Tags Store, You Own Now.</Text>
        </Text>
        <Center mx={"auto"} mt={5}>
          <HStack mx={"auto"}>
            <Box
              px={2}
              py={2}
              borderRadius={"20%"}
              bg={"brand.primary"}
              _hover={{ cursor: "pointer", color: "#fff" }}
            >
              <FaTwitter size={20} />
            </Box>
            <Box
              px={2}
              py={2}
              borderRadius={"20%"}
              bg={"brand.primary"}
              _hover={{ cursor: "pointer", color: "#fff" }}
            >
              <FaFacebook size={20} />
            </Box>
            <Box
              px={2}
              py={2}
              borderRadius={"20%"}
              bg={"brand.primary"}
              _hover={{ cursor: "pointer", color: "#fff" }}
            >
              <FaInstagram size={20} />
            </Box>
            <Box
              px={2}
              py={2}
              borderRadius={"20%"}
              bg={"brand.primary"}
              _hover={{ cursor: "pointer", color: "#fff" }}
            >
              <FaGithub size={20} />
            </Box>
          </HStack>
        </Center>
        <Text
          color={"#8E8E8E"}
          fontSize={"0.7rem"}
          mx={"auto"}
          mt={3}
          textAlign={"center"}
        >
          Copyright © 2024 Tags Store
        </Text>
      </Box>
    </Box>
  );
};
