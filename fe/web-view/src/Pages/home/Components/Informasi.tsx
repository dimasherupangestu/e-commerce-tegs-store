import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { HiOutlineCreditCard } from "react-icons/hi";
import { PiPackage } from "react-icons/pi";
import { TbTruckReturn } from "react-icons/tb";

export const Informasi = () => {
  return (
    <Box
      w={"100%"}
      h={"100%"}
      maxH={"100%"}
      minHeight={"100%"}
      bg={"brand.primary"}
    >
      <Box
        w={"90%"}
        mx={"auto"}
        h={"100%"}
        py={4}
        gap={3}
        display={"flex"}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent={"space-evenly"}
        alignItems={"center"}
      >
        <Box
          w={"16rem"}
          h={"4.2rem"}
          borderRadius={"5px"}
          bg={"#fff"}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
          mx={"auto"}
        >
          <HStack>
            <Box ml={5} overflow={"hidden"}>
              <PiPackage size={35} color="#000" />
            </Box>
            <Stack ml={2}>
              <Text fontSize={"1rem"}>FastedDelivery</Text>
              <Text
                fontSize={{ base: "0.6rem", md: "0.6rem", lg: "0.8rem" }}
                mt={-2}
                fontWeight={300}
              >
                Delivery in 24/H
              </Text>
            </Stack>
          </HStack>
        </Box>

        <Box
          w={"16rem"}
          h={"4.2rem"}
          borderRadius={"5px"}
          bg={"#fff"}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
          mx={"auto"}
        >
          <HStack>
            <Box ml={5}>
              <TbTruckReturn size={35} color="#000" />
            </Box>
            <Stack ml={2}>
              <Text fontSize={{ base: "0.8rem", md: "0.8rem", lg: "1rem" }}>
                24 Hours Return
              </Text>
              <Text
                fontSize={{ base: "0.6rem", md: "0.6rem", lg: "0.7rem" }}
                mt={-2}
                fontWeight={300}
              >
                100% money-back guarantee
              </Text>
            </Stack>
          </HStack>
        </Box>

        <Box
          w={"16rem"}
          h={"4.2rem"}
          borderRadius={"5px"}
          bg={"#fff"}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
          mx={"auto"}
        >
          <HStack>
            <Box ml={5}>
              <HiOutlineCreditCard size={35} color="#000" />
            </Box>
            <Stack ml={2}>
              <Text fontSize={"1rem"}>Secure Payment</Text>
              <Text fontSize={"0.7rem"} mt={-2} fontWeight={300}>
                Your money is safe
              </Text>
            </Stack>
          </HStack>
        </Box>

        <Box
          w={"16rem"}
          h={"4.2rem"}
          borderRadius={"5px"}
          bg={"#fff"}
          justifyContent={"center"}
          alignItems={"center"}
          alignContent={"center"}
          mx={"auto"}
        >
          <HStack>
            <Box ml={5}>
              <FaHeadphonesSimple size={35} color="#000" />
            </Box>
            <Stack ml={2}>
              <Text fontSize={"1rem"}>Support 24/7</Text>
              <Text fontSize={"0.7rem"} mt={-2} fontWeight={300}>
                Live contact/message
              </Text>
            </Stack>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};
