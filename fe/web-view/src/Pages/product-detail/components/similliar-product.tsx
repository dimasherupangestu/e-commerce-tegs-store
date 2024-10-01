import { Card, CardBody, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { IProductDetail } from "../../../types/product-detail";

const SimilarProduct = (props: IProductDetail) => {
    return (
        <>
            <Flex>
                <Card maxW='sm'>
                    <CardBody>
                        <Image
                            src={props.image && props.image.length > 0 ? props.image[0] : ''}
                            borderRadius='lg'
                        />
                        <Stack mt='6' spacing='3'>
                            <Heading size='md'>{props.product_name}</Heading>
                            <Text color='blue.600' fontSize='2xl'>
                                {props.price}
                            </Text>
                        </Stack>
                    </CardBody>
                </Card>
            </Flex>
        </>
    )
}

export default SimilarProduct;
