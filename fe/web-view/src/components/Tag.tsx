import { Box, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { ITag } from "../types/interface";

export const Tag = ({ clideren }: ITag) => {
  return (
    <>
      <Box w={"100%"}>
        <Box position={"relative"}>
          <Heading
            fontFamily={"Poppins"}
            position={"relative"}
            zIndex={10}
            fontSize={"2rem"}
            // bg={"red"}
            fontWeight={800}
          >
            {clideren}
          </Heading>
          <Image
            src="../../src/assets/img/vector.png"
            w={100}
            position={"absolute"}
            top={6}
            left={-2}
            zIndex={1}
          />
        </Box>
      </Box>
    </>
  );
};
