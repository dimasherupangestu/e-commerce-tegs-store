import { Box, Text } from "@chakra-ui/react";
import { ICategori } from "../../../types/interface";
import { Link } from "react-router-dom";

export const Categori = (props: ICategori) => {
  return (
    <>
      <Box w={"100%"} h={"100%"}>
        <Link to={`/category/${props.name}`}>
          <Box
            w={"90%"}
            mx={"auto"}
            h={"100%"}
            display={"flex"}
            flexWrap={"wrap"}
          >
            <Box
              key={props.id}
              w={{ base: "100%", md: "100%", lg: "100%", xl: "24rem" }}
              // bg={{ base: "#fff", md: "blue", lg: "red", xl: "yellow" }}
              h={{ base: "15rem", md: "18rem", lg: "20rem", xl: "32rem" }}
              mx={"auto"}
              flexWrap={"wrap"}
              borderRadius={"15px"}
              background={`url(${props.image})`}
              backgroundSize={"cover"}
              backgroundPosition={{
                base: "top",
                md: "top",
                lg: "top",
                xl: "center",
              }}
              m={2}
              className="my-box"
            >
              <Box
                w={"100%"}
                h={"100%"}
                borderRadius={"15px"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                  ".my-box:hover &": {
                    background: "rgba(0,0,0,0.6)",
                  },
                }}
              >
                <Text
                  color={"brand.primary"}
                  display={"none"}
                  fontSize={"1.8rem"}
                  textAlign={"center"}
                  m={"auto"}
                  fontWeight={700}
                  sx={{
                    ".my-box:hover &": {
                      display: "block",
                    },
                  }}
                >
                  {props.name}
                </Text>
              </Box>
            </Box>
          </Box>
        </Link> 
      </Box>
    </>
  );
};
