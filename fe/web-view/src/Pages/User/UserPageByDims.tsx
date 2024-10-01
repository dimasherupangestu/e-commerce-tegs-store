// import {
//   Avatar,
//   Box,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   Center,
//   Flex,
//   FormControl,
//   HStack,
//   Input,
//   Text,
// } from "@chakra-ui/react";
// import React from "react";
// import { Layout } from "../../Layout";
// import { FaChevronRight, FaShoppingBag, FaUser } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { RiPencilFill } from "react-icons/ri";

// export const UserPage = () => {
//   return (
//     <Box w={"100%"} h={"100%"}>
//       <Layout>
//         <Flex w={"100%"} h={"100%"} minHeight={"100vh"}>
//           <Box
//             w={"23%"}
//             h={"100%"}
//             bg={"#F8F8F8"}
//             display={"flex"}
//             minHeight={"100vh"}
//             justifyContent={"center"}
//             // alignItems={"center"}
//             pt={8}
//           >
//             <Box w={"80%"} pt={8} h={"100%"}>
//               <HStack>
//                 <FaUser size={25} />
//                 <Text>My account</Text>
//               </HStack>
//               <HStack mt={6}>
//                 <FaShoppingBag size={25} />
//                 <Text>Transactions</Text>
//               </HStack>
//             </Box>
//           </Box>
//           <Box w={"100%"} h={"100%"}>
//             <Box
//               w={"100%"}
//               h={"2.5rem"}
//               display={"flex"}
//               alignItems={"center"}
//               bg={"#F2F4F5"}
//             >
//               <Breadcrumb
//                 spacing="8px"
//                 w={"90%"}
//                 color={"#718096"}
//                 fontSize={"0.8rem"}
//                 mx={"auto"}
//                 separator={<FaChevronRight color="#718096" />}
//               >
//                 <BreadcrumbItem>
//                   <BreadcrumbLink as={Link} to="/">
//                     Home
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>

//                 <BreadcrumbItem>
//                   <BreadcrumbLink as={Link} to="/">
//                     My account
//                   </BreadcrumbLink>
//                 </BreadcrumbItem>
//               </Breadcrumb>
//             </Box>

//             <Box w={"100%"} px={9} pt={6} h={"100%"}>
//               <FormControl>
//                 <Text fontSize={"1.3rem"} fontWeight={700} ml={-3}>
//                   My account
//                 </Text>

//                 <Box ml={2} mt={3} position={"relative"}>
//                   <Avatar
//                     name="Segun Adebayo"
//                     src="https://bit.ly/dan-abramov"
//                     size={"lg"}
//                   />
//                   <Center
//                     w={"2.8rem"}
//                     h={"2.8rem"}
//                     borderRadius={"50%"}
//                     // bg={"rgba(0, 0, 0, )"}
//                     as="label"
//                     pos={"absolute"}
//                     top={30}
//                     left={8}
//                   >
//                     <RiPencilFill size={28} color="#00AA5B" />
//                     <Input
//                       type="file"
//                       hidden
//                       accept="image/jpp,image/png ,image/jpeg"
//                     />
//                   </Center>
//                 </Box>
//               </FormControl>
//             </Box>
//           </Box>
//         </Flex>
//       </Layout>
//     </Box>
//   );
// };