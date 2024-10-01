import React from 'react';
import Slider from 'react-slick';
import { Box } from '@chakra-ui/react';
import { CardShop } from './CardShop';
import { IProductDetail } from '../types/product-detail';

interface ProductCarouselProps {
  products: IProductDetail[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {products.map((product) => (
        <Box key={product.id} p={2}>
          <CardShop {...product} />
        </Box>
      ))}
    </Slider>
  );
};

export default ProductCarousel;
