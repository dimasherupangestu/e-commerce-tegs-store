import { Button, Flex, Text } from "@chakra-ui/react";
import { useCheckout } from "../hooks/useCheckout";
import useDelivery from "../hooks/useDelivery";
import useShoppingCart from "../../shoppingCart/hooks/useShoppingCart";

const TotalPayment = () => {
  const { selectedService } = useDelivery();
  const { productsInShoppingCart } = useShoppingCart();
  const { total } = productsInShoppingCart;
  const { pay, show } = useCheckout();
  const deliveryFee = selectedService?.cost[0]?.value || 0;

  return (
    <Flex
      flexDirection="column"
      gap={2}
      textAlign="right"
      width={{ base: "100%", md: "30%" }}
      m={{ base: "auto", md: "auto 0 0 70%" }}
      position="relative"
    >
      <Flex justifyContent="space-between">
        <Text>Subtotal product</Text>
        <Text marginLeft="auto">Rp {total}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>Delivery fee</Text>
        <Text marginLeft="auto">Rp {deliveryFee}</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>Service fee</Text>
        <Text marginLeft="auto">Rp 5000</Text>
      </Flex>
      <Flex justifyContent="space-between">
        <Text>Total payment</Text>
        <Text marginLeft="auto">Rp {total + deliveryFee + 5000}</Text>
      </Flex>
      <Button
        colorScheme='whatsapp'
        borderRadius={10}
        w={"80%"}
        m={"auto"}
        mt={10}
        onClick={pay}
      >
        Payment Method
      </Button>

      {show && (
        <Flex
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgba(0, 0, 0, 0.6)"
          zIndex={1000}
        >
          <div id="snap-container" style={{ width: '100%', maxWidth: '600px', height: 'auto', backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}></div>
        </Flex>
      )}
    </Flex>
  );
};

export default TotalPayment;
