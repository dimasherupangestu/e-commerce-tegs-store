/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { FaStar } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';
import { IProductDetail } from '../../../types/product-detail';
import { useProductDetail } from '../hooks/product-detail';

const ProductDetailComps = (props: IProductDetail) => {
    const { addToCart } = useProductDetail(props.id);
    const [selectedImage, setSelectedImage] = useState(props.image && props.image.length > 0 ? props.image[0] : '');
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const token = localStorage.getItem('token');
  
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(props.size && props.size.length > 0 ? 0 : -1);
    const [selectedColorIndex, setSelectedColorIndex] = useState(props.color && props.color.length > 0 ? 0 : -1);

    const selectedSize = props.size ? props.size[selectedSizeIndex] || '' : '';
    const selectedColor = props.color ? props.color[selectedColorIndex] || '' : '';

    useEffect(() => {
        if (props.image && props.image.length > 0) {
            setSelectedImage(props.image[0]);
        }
    }, [props.image]);

    const handleImageClick = (newImage: string, index: number) => {
        setSelectedImage(newImage);
        setSelectedImageIndex(index);
    };

    const selectSize = (index: number) => {
        setSelectedSizeIndex(index);
    }

    const selectColor = (index: number) => {
        setSelectedColorIndex(index);
    }

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
    
    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    const handleAddToCart = async (_event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        await addToCart(props.id, quantity, selectedSize, selectedColor, token);
    }

    return (
        <Flex mt={10} flexDirection={{ base: 'column', md: 'row' }}>
            <Flex flexDirection={"column"}>
                <Flex border={'0.4px solid #ddd'} p={5} justifyContent={"center"}>
                    <Image src={selectedImage} height={350} width={350} />
                </Flex>
                <Flex mt={5} gap={3} justifyContent={"center"}>
                    {props.image && props.image.map((image: string, index: number) => (
                        <Flex key={index} border={selectedImageIndex === index ? '4px solid green' : '0.4px solid #ddd'} p={2} justifyContent={"center"} textAlign={"center"} borderRadius={15}>
                            <Image src={image} height={50} width={50} onClick={() => handleImageClick(image, index)} />
                        </Flex>
                    ))}
                </Flex> 
            </Flex>
            <Box alignItems="center" ml={{ base: 5, md: 10 }} w={{ base: '100%', md: '70%' }} mt={5}>
                <Text w={{ base: '100%', md: '70%' }} fontWeight={700} fontSize={30}>{props.product_name}</Text>
                <Flex alignItems="center" mt={3}>
                    <FaStar color="gold" fontSize={20} />
                    <Text ml={2} fontSize={20}>{props.rating}</Text>
                </Flex>
                <Text fontWeight={700} fontSize={40} mt={5}> Rp. {props.price}</Text>
                <Text fontWeight={700} fontSize={20} mt={5}>Choose color</Text>
                <Flex gap={3} mt={5}>
                    {props.color && props.color.map((color, index) => (
                        <Flex key={index} border={selectedColorIndex === index ? '4px solid green' : '0.4px solid #ddd'} p={2} justifyContent={"center"} textAlign={"center"} borderRadius={15} h={10} onClick={() => selectColor(index)} cursor={"pointer"}>
                            <Text ml={2}>{color}</Text>
                        </Flex>
                    ))}
                </Flex>

                <Text fontWeight={700} fontSize={20} mt={5}>Choose size</Text>
                <Flex gap={3} mt={5}>
                    {props.size && props.size.map((size, index) => (
                        <Flex key={index} border={selectedSizeIndex === index ? '4px solid green' : '0.4px solid #ddd'} p={2} justifyContent={"center"} textAlign={"center"} borderRadius={15} h={10} onClick={() => selectSize(index)} cursor={"pointer"}>
                            <Text ml={2}>{size}</Text>
                        </Flex>
                    ))}
                </Flex>

                <Flex mt={12} flexDirection={{ base: 'column', md: 'row' }} gap={3} alignItems={"center"} justifyContent={"center"} ml={{ base: -14, md: -280 }}>
                    <Flex border={'0.4px solid #ddd'} p={2} justifyContent={"center"} textAlign={"center"} h={10} width={"150px"} gap={10}>
                        <Text cursor={"pointer"} onClick={decreaseQuantity} style={{ cursor: 'pointer' }}>-</Text>
                        <Text>{quantity}</Text>
                        <Text cursor={"pointer"} onClick={increaseQuantity} style={{ cursor: 'pointer' }}>+</Text>
                    </Flex> 

                    <Flex ml={{ base: 0, md: 5 }} border={'0.4px solid #ddd'} p={2} justifyContent={"center"} textAlign={"center"} h={10} width={"200px"} gap={2} bgColor={"#1cb86f"} color={"#fff"} onClick={handleAddToCart} cursor={"pointer"}>
                        ADD TO CART <FiShoppingCart />
                    </Flex>

                    <Box ml={{ base: 0, md: 5 }} border={'0.4px solid #ddd'} p={2} justifyContent={"center"} textAlign={"center"} h={10} width={"150px"} gap={2} bgColor={"#1cb86f"} color={"#fff"} cursor={"pointer"}>
                        BUY NOW
                    </Box>
                </Flex>
            </Box>
        </Flex>
    );
}

export default ProductDetailComps;
