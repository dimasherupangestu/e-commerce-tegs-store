import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Image } from "@chakra-ui/react";
import Slider from "react-slick";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { ICorousel } from "../types/interface";

function PrevArrow(props: ICorousel) {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      display={{ base: "none", md: "block" }}
      style={{ ...style, display: "block", zIndex: 5 }}
      onClick={onClick}
    >
      <FaArrowAltCircleLeft size={35} color="#00AA5B" />
    </Box>
  );
}

function NextArrow(props: ICorousel) {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      display={{ base: "none", md: "block" }}
      style={{ ...style, display: "block", zIndex: 5, marginRight: "20px" }}
      onClick={onClick}
    >
      <FaArrowAltCircleRight size={35} color="#00AA5B" />
    </Box>
  );
}

export const Coreusel = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 3000,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <>
      <Box w={"100%"} h={"100%"} mx={"auto"}>
        <Box position={"relative"}>
          <Slider {...settings}>
            <Box w={"100%"} h={"100%"}>
              <Image
                src="../../src/assets/img/hero1.png"
                borderRadius={"20px"}
                w={"100%"}
                mx={"auto"}
                h={"27rem"}
                objectFit={"cover"}
              />
            </Box>

            <Box w={"100%"} h={"100%"}>
              <Image
                src="../../src/assets/img/benner1.jpg"
                w={"100%"}
                mx={"auto"}
                borderRadius={"20px"}
                h={"27rem"}
              />
            </Box>

            <Box w={"100%"} h={"100%"}>
              <Image
                src="../../src/assets/img/benner2.jpg"
                w={"100%"}
                mx={"auto"}
                borderRadius={"20px"}
                h={"27rem"}
              />
            </Box>

            <Box w={"100%"} h={"100%"}>
              <Image
                src="../../src/assets/img/benner3.jpg"
                w={"100%"}
                mx={"auto"}
                borderRadius={"20px"}
                h={"27rem"}
              />
            </Box>
          </Slider>
        </Box>
      </Box>
    </>
  );
};
