import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  List,
  ListItem,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { AiOutlineTransaction, AiOutlineMail, AiOutlineCheckCircle } from "react-icons/ai";
import { FaRegAddressCard, FaProductHunt } from "react-icons/fa";
import useOrderStatus from "./hooks/useOrderStatus";
import { DeliveryDetail } from "../../types/order-status";
import { Layout } from "../../Layout";

const OrderStatusPage = () => {
  const { orderStatus, loading, error } = useOrderStatus();
  console.log("Order Status Data:", orderStatus);

  if (loading) return <Spinner size="xl" color="teal.500" />;
  if (error) return <Alert status="error"><AlertIcon />{error}</Alert>;
  if (!orderStatus) return <Text>No order found.</Text>;

  const {
    transaction_id,
    customer_name,
    customer_email,
    status,
    product,
    delivery_details,
    payment_method,
    service_fee,
    total
  } = orderStatus;

  const parsedDeliveryDetails: DeliveryDetail = JSON.parse(delivery_details);

  return (
    <Layout>
      <Box maxW="600px" mx="auto" p={5} borderWidth={1} borderRadius="lg" boxShadow="md" mt={5}>
        <Heading as="h1" size="lg" mb={4}>
          Order Status
        </Heading>
        <VStack spacing={4} align="stretch">
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">
              <AiOutlineTransaction style={{ display: "inline", marginRight: "8px" }} />
              Transaction ID:
            </Text>
            <Text>{transaction_id}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">
              <FaRegAddressCard style={{ display: "inline", marginRight: "8px" }} />
              Customer Name:
            </Text>
            <Text>{customer_name}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">
              <AiOutlineMail style={{ display: "inline", marginRight: "8px" }} />
              Customer Email:
            </Text>
            <Text>{customer_email}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">
              <AiOutlineCheckCircle style={{ display: "inline", marginRight: "8px" }} />
              Status:
            </Text>
            <Badge colorScheme={status === "PAID" ? "green" : "yellow"}>{status}</Badge>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">Payment Method:</Text>
            <Text>{payment_method || "Unpaid"} </Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">Service Fee:</Text>
            <Text>Rp {service_fee}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">Delivery Service:</Text>
            <Text>{parsedDeliveryDetails.description} ({parsedDeliveryDetails.service})</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">Delivery Cost:</Text>
            <Text>Rp {parsedDeliveryDetails.cost[0].value} (ETD: {parsedDeliveryDetails.cost[0].etd} days)</Text>
          </HStack>
        </VStack>

        <Heading as="h2" size="md" mt={6} mb={4}>
          Products Purchased:
        </Heading>
        <List spacing={3}>
          {product.map((productItem) => (
            <ListItem key={productItem.id}>
              <HStack justifyContent="space-between">
                <Box>
                  <Text fontWeight="bold">
                    <FaProductHunt style={{ display: "inline", marginRight: "8px" }} />
                    {productItem.product_name}
                  </Text>
                  <Text>Quantity: {productItem.quantity}</Text>
                </Box>
                <Text>Rp {productItem.price}</Text>
              </HStack>
            </ListItem>
          ))}
        </List>
        <Box mt={2}>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">Service Fee:</Text>
            <Text>Rp {service_fee}</Text>
          </HStack>
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">Delivery Cost:</Text>
            <Text>Rp {parsedDeliveryDetails.cost[0].value}</Text>
          </HStack>
        </Box>
        <HStack justifyContent="space-between" mt={6}>
          <Text fontWeight="bold">Total:</Text>
          <Text>Rp {total + service_fee + parsedDeliveryDetails.cost[0].value}</Text>
        </HStack>
      </Box>
    </Layout>
  );
};

export default OrderStatusPage;
