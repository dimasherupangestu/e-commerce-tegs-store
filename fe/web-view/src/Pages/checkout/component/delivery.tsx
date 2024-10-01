/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Divider, Flex, Text, Radio, RadioGroup, VStack, Card, CardBody, Stack, Spinner } from "@chakra-ui/react";
import useDelivery from "../hooks/useDelivery";

const Delivery = () => {
    const { deliveryResults, loading, handleCourierChange, handleServiceChange, selectedCourier, selectedService } = useDelivery();
    console.log('selectedService', selectedService)
    return (
        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="md">
            <Text fontSize="1.2rem" fontWeight={700}>Choose Delivery</Text>
            <Divider orientation='horizontal' mt={2} mb={4} />

            <Flex direction={{ base: "column", md: "row" }} alignItems="center" gap={4}>
                <RadioGroup onChange={handleCourierChange} value={selectedCourier || ''}>
                    <VStack spacing={4} align="start">
                        <Radio value="jne" colorScheme="green">JNE</Radio>
                        <Radio value="pos" colorScheme="green">POS</Radio>
                        <Radio value="tiki" colorScheme="green">TIKI</Radio>
                    </VStack>
                </RadioGroup>
            </Flex>

            <Divider orientation='horizontal' mt={4} mb={4} />

            {loading ? (
                <Flex justify="center" align="center" minHeight="100px">
                    <Spinner size="lg" />
                    <Text ml={4}>Loading...</Text>
                </Flex>
            ) : (
                deliveryResults.length > 0 && deliveryResults.map((result) => (
                    <Card key={result.code} mb={4} borderWidth={1} borderRadius="md" boxShadow="md">
                        <CardBody>
                            <Text fontWeight="bold" fontSize="lg">{result.name}</Text>
                            <RadioGroup onChange={(value) => handleServiceChange(value, result.costs.find((c: any) => c.service === value))} value={selectedService?.service || ''}>
                                {result.costs.map((cost:any) => (
                                    <Box key={cost.service} mt={4}>
                                        <Text fontWeight="semibold">{cost.description}</Text>
                                        {cost.cost.map((item:any, index:number) => (
                                            <Stack spacing={2} key={index} mt={2} borderWidth={1} borderRadius="md" p={4} bg="gray.50">
                                                <Radio value={cost.service} colorScheme="green">
                                                    <Text fontWeight="medium">Price: Rp {item.value}</Text>
                                                    <Text fontWeight="medium">Estimated Delivery Time: {item.etd} days</Text>
                                                </Radio>
                                            </Stack>
                                        ))}
                                    </Box>
                                ))}
                            </RadioGroup>
                        </CardBody>
                    </Card>
                ))
            )}
        </Box>
    );
};

export default Delivery;
