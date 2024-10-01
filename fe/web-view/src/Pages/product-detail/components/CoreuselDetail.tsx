import Slider from "react-slick";
import { Box } from "@chakra-ui/react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { ICorousel } from "../../../types/interface";
import { useProductDetail } from "../hooks/product-detail";
import { CardShop } from "../../../components/CardShop";
import { useParams } from "react-router-dom";

function PrevArrow(props: ICorousel) {
  const { className, style, onClick } = props;
  return (
    <Box
      className={className}
      display={{ base: "none", md: "block" }}
      style={{ ...style, display: "block", zIndex: 5, marginLeft: "20px",marginTop: "-50px" }}
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
      style={{ ...style, display: "block", zIndex: 5, marginRight: "40px", marginTop: "-50px" }}
      onClick={onClick}
    >
      <FaArrowAltCircleRight size={35} color="#00AA5B" />
    </Box>
  );
}

export const CoreuselDetail = () => {
  const { productId } = useParams();
  const { productSimilarData } = useProductDetail(productId as string);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: true,
          prevArrow: <PrevArrow />,
          nextArrow: <NextArrow />,
        },
      },
    ],
  };

  return (
    <Box w={"100%"} h={"100%"} mx={"auto"} position={"relative"}>
      <Slider {...settings}>
        {productSimilarData?.map((item) => (
          <Box key={item.id} w={"100%"} h={"100%"}>
            <CardShop id={item.id} {...item} />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

