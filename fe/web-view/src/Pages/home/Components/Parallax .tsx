import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Parallax } from "react-parallax";

export const ParallaxComponent = () => {
  return (
    <Box w={"100%"} h={"100%"} position={"relative"}>
      <Parallax
        bgImage="../../src/assets/img/benner4.png"
        bgImageAlt="img"
        strength={600}
        // blur={2}
        style={{ width: "100%", height: "100%" }}
      >
        <Box
          w={"100%"}
          h={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          position={"relative"}
        >
          <Text
            position={"absolute"}
            color={"#F2F2F2"}
            fontWeight={200}
            fontStyle={"italic"}
            fontFamily={"Poppins"}
            fontSize={"1.3rem"}
            top={40}
            mt={-2}
            left={{ base: "14%", md: "19%", lg: "31%" }}
          >
            CHOOSE
          </Text>
          <Text
            position={"absolute"}
            color={"#F2F2F2"}
            fontWeight={800}
            fontFamily={"Poppins"}
            fontSize={{ base: "3.5rem", md: "5rem", lg: "5rem" }}
            top={40}
          >
            YOUR STYLE.
          </Text>
        </Box>
      </Parallax>
    </Box>
  );
};
