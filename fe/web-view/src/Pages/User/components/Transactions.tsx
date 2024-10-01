/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { FaShoppingBag } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import useTransaction from "../hooks/useTransaction";
import { useNavigate } from "react-router-dom";

const TransactionsContent = () => {
  const { transactions } = useTransaction();
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 6;

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const navigate = useNavigate();

  const handleTransactionClick = (id: string) => {
    navigate(`/order-status/${id}`);
  };

  return (
    <Box mt={-5} w={"1000px"}>
      <Heading size="lg">Transactions</Heading>
      {currentTransactions.map((transaction: any, index: number) => {
        const deliveryDetails = typeof transaction.delivery_details === 'string'
          ? JSON.parse(transaction.delivery_details)
          : transaction.delivery_details;

        const deliveryCost = deliveryDetails?.cost[0]?.value || 0;
        const totalAmount = transaction.total + transaction.service_fee + deliveryCost;

        const statusBackgroundColor = transaction.status.toLowerCase() === 'paid' ? 'green.100' : 'red.100';

        return (
          <Flex
            key={index}
            border={"1px solid gray"}
            p={5}
            mt={5}
            w={"90%"}
            alignItems={"center"}
            borderRadius={"10px"}
            direction={"row"}
            justify={"space-between"}
            onClick={() => handleTransactionClick(transaction.id)}
            cursor={"pointer"}
          >
            <Flex alignItems={"center"} gap={3}>
              <Text>
                <FaShoppingBag fontSize={"20px"} />
              </Text>
              <Box>
                <Text>Order #{transaction.id}</Text>
                <Text color={"gray.500"}>{transaction.date}</Text>
              </Box>
            </Flex>

            <Flex alignItems={"center"} gap={3}>
              <TbPointFilled />
              <Text color={"gray.500"}>Rp {totalAmount}</Text>
            </Flex>
            
            <Flex alignItems={"center"} gap={3}>
              <TbPointFilled />
              <Text color={"gray.500"}>
                Items: {transaction.product.length} product{transaction.product.length > 1 ? "s" : ""}
              </Text>
            </Flex>

            <Flex
              alignItems={"center"}
              gap={3}
              p={2}
              borderRadius={"md"}
              bg={statusBackgroundColor}
            >
              <TbPointFilled />
              <Text color={transaction.status.toLowerCase() === 'paid' ? 'green.800' : 'red.800'}>
                {transaction.status}
              </Text>
            </Flex>
          </Flex>
        );
      })}
      
      <Flex justifyContent={"center"} mt={5}>
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          mr={2}
        >
          Previous
        </Button>
        <Text mt={2}>
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          ml={2}
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default TransactionsContent;
