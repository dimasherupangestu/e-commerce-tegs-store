import { Box, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { CiCreditCard1, CiDeliveryTruck } from "react-icons/ci";
import { FaHandshake, FaHeadphones, FaUncharted } from "react-icons/fa";
    
interface InformationDescriptionProps {
    description?: string;
}

const InformationDescription = (props: InformationDescriptionProps) => {
    return (
        <Flex justifyContent="center">
            <Tabs>
                <TabList style={{ justifyContent: "center" }}>
                    <Tab>Description</Tab>
                    <Tab>Review</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Flex justifyContent="center" gap={5} flexDirection={{base : 'column', md : 'row'}}>
                            <Box width={{base : '100%', md : '25%'}}>
                                <Text>Description</Text>
                                <Text mt={"10px"}>{props.description}</Text>
                            </Box>
                            <Box gap={"50px"}>
                                <Text>Feature</Text>
                                <Flex alignItems={"center"} m={"10px 0 5px 0"}><FaUncharted color="#fa8232"/> : Free 1 year warranty</Flex>
                                <Flex alignItems={"center"} mb={"5px"}><CiDeliveryTruck color="#fa8232"/> : Free shipping & Fasted delivery</Flex>
                                <Flex alignItems={"center"}mb={"5px"}><FaHandshake color="#fa8232" />: 100% Money-back guarantee</Flex>
                                <Flex alignItems={"center"}mb={"5px"}><FaHeadphones color="#fa8232" /> : 24/7 Customer support</Flex>
                                <Flex alignItems={"center"}mb={"5px"}><CiCreditCard1 color="#fa8232" /> : Secure payment method</Flex>
                            </Box>
                            <Box>
                                <Text>Shipping Information</Text>
                                <Text mt="10px" mb={"5px"}><span style={{fontWeight:"bold"}}>Courier :</span> 2-4 days, free shipping</Text>
                                <Text mb={"5px"}>
                                <span style={{fontWeight:"bold"}}>Local Shipping :</span> Up to one week, $19.00</Text>
                                <Text mb={"5px"}>
                                <span style={{fontWeight:"bold"}}>UPS Ground Shipping :</span> 4-6 days, $29.00</Text>
                                <Text mb={"5px"}><span style={{fontWeight:"bold"}}>Unishop Global Export : </span> 
                                3-4 days, $39.00</Text>
                            </Box>
                        </Flex>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    );
}

export default InformationDescription;
