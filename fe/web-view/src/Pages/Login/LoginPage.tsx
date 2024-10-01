import { Box, Center, Flex, Image } from "@chakra-ui/react";
import { FormLogin } from "./components/FormLogin";

export const LoginPage = () => {
  return (
    <Box w={"100%"} h={"100vh"} minHeight={"100%"}>
      <Box w={"100%"} h={"100%"} bg={"#fff"}>
        <Center mx={"auto"} mt={5}>
          <Image
            src="../../src/assets/img/logo3.png"
            w={"18rem"}
            h={"3.7rem"}
          />
        </Center>
        <Flex w={"90%"} mx={"auto"} mt={5} flexWrap={"wrap"}>
          <Box
            w={{ base: "100%", md: "100%", lg: "55%", xl: "55%" }}
            h={"35rem"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image
              src="../../src/assets/img/login.png"
              w={"90%"}
              h={"90%"}
            ></Image>
          </Box>
          <Box
            w={{ base: "100%", md: "100%", lg: "45%", xl: "45%" }}
            h={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            // bg={"green"}
            m={"auto"}
          >
            <FormLogin />
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
