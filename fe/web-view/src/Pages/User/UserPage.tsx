import {
  Box,
  Flex,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  HStack,
} from "@chakra-ui/react";
import { Layout } from "../../Layout";
import { FaShoppingBag, FaUser } from "react-icons/fa";
import MyAccount from "./components/MyAccount";
import TransactionsContent from "./components/Transactions";

export const UserPage = () => {
  return (
    <Box w="100%" h="100%">
      <Layout>
        <Flex height={'auto'}>
          {/* Sidebar (TabList) */}
          <Box width="250px" bg="#f8f8f8" p="10">
            <Tabs orientation="vertical">
              <TabList borderBottom="none">
                <Tab borderBottom="none">
                  <HStack spacing="2">
                    <FaUser />
                    <Text>My Account</Text>
                  </HStack>
                </Tab>
                <Tab borderBottom="none">
                  <HStack spacing="2">
                    <FaShoppingBag />
                    <Text>Transactions</Text>
                  </HStack>
                </Tab>
              </TabList>

              <Box flex="1" ml="60px" mt="0">
                <TabPanels>
                  <TabPanel>
                    <MyAccount />
                  </TabPanel>
                  <TabPanel>
                    <TransactionsContent />
                  </TabPanel>
                </TabPanels>
              </Box>
            </Tabs>
          </Box>
        </Flex>
      </Layout>
    </Box>
  );
};
