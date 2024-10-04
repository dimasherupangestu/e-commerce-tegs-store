import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaSearch,
  FaTwitter,
} from "react-icons/fa";
import { LuShoppingCart, LuUser2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import { useToast } from '@chakra-ui/react'
import useSearch from "../Pages/Search/hooks/useSearch";
import { APIWithToken } from "../libs/axios";
import useShoppingCart from "../Pages/shoppingCart/hooks/useShoppingCart";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
 const [keranjangId, setKeranjangId] = useState(0);
  const {productsInShoppingCart} = useShoppingCart();
  const logout = useAuthStore((state) => state.logout);
  const { handleInputChange, handleSearch, searchParams, handleKeyDown } = useSearch();
  const navigate = useNavigate();
  // console.log('tes', productsInShoppingCart)
  useEffect(() => {
    setKeranjangId(productsInShoppingCart.products.length);
  }, [productsInShoppingCart])
 
  
const toast = useToast()
  const handleCart = () => {
    if (isAuthenticated()) {
      navigate("/shopping-cart");
     
      
    } else {
      navigate("/login");
      toast({
        title:"Plis login first",
        status:"error",
        position:"top"
      })
    }
  };

  const handleLogout = async () => {
    try {
      const response = await APIWithToken('users/current');
      console.log(response.data);
      logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <Box as="nav" w={"100%"} h={"5rem"} bg={"brand.primary"}>
      <Box
        w={"80%"}
        pt={"0.4rem"}
        mx={"auto"}
        display={"flex"}
        justifyContent={"space-between"}
      >
        <Text fontSize={"0.6rem"} color={"white"}>
          Welcome to E-Commerce Tags Store
        </Text>
        <Box color={"white"}>
          <HStack>
            <Text fontSize={"0.7rem"}> Follow Us : </Text>
            <HStack>
              <Box _hover={{ cursor: "pointer", color: "#000" }}>
                <FaTwitter size={15} />
              </Box>
              <Box _hover={{ cursor: "pointer", color: "#000" }}>
                <FaFacebook size={15} />
              </Box>
              <Box _hover={{ cursor: "pointer", color: "#000" }}>
                <FaInstagram size={15} />
              </Box>
              <Box _hover={{ cursor: "pointer", color: "#000" }}>
                <FaGithub size={15} />
              </Box>
            </HStack>
          </HStack>
        </Box>
      </Box>
      <Box w={"80%"} mx={"auto"} mt={1} px={2}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box onClick={() => navigate("/")}>
            <Image
              src={"../../src/assets/img/logo.png"}
              alt="logo"
              w={"10rem"}
              h={"2rem"}
            />
          </Box>
          <Box width={"60%"}>
            <InputGroup>
              <Input
                name="query"
                color="black"
                type="text"
                border={"none"}
                w={"100%"}
                h={"2.4rem"}
                bg={"#F5F5F5"}
                borderRadius={"0.2rem"}
                fontSize={"0.8rem"}
                placeholder="Search for products"
                onChange={handleInputChange}
                value={searchParams.query}
                onKeyDown={handleKeyDown}
              />
              <InputRightElement pr={4} onClick={handleSearch}>
                <FaSearch size={15} />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box w={"10rem"} display={"flex"} alignItems={"center"}>
            <Box color={"white"} mr={3} _hover={{ cursor: "pointer" }} onClick={handleCart} pos={"relative"}>
              <LuShoppingCart size={23} />
             {keranjangId > 0 && (<Center pos={"absolute"} top={-2} left={4} bg={"#fefefe"} color={"#00AA5B"}
               w={'1.1rem'} h={'1.1rem'} textAlign={'center'} mx={'auto'} fontSize={'0.6rem'} borderRadius={"100%"}>
                <Text color={'#00AA5B'} textAlign={"center"} m={'auto'} mt={'1px'} fontWeight={'bold'}>
                 {keranjangId}
                  </Text>
               </Center>)}
            </Box>
            <Box ml={3}>
              <HStack>
                {isAuthenticated() ? (
                  <>
                    <LuUser2 color="white" fontSize={22} onClick={() => navigate("/user")} />
                    <Button
                      ml={3}
                      bg={"#FF0000"}
                      _hover={{ bg: "#CC0000" }}
                      color={"#fff"}
                      border={"none"}
                      borderRadius={"0.3rem"}
                      w={"5rem"}
                      h={"1.6rem"}
                      fontSize={"0.7rem"}
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      bg={"#fff"}
                      color={"brand.primary"}
                      border={"1px solid brand.secondary"}
                      borderRadius={"0.3rem"}
                      w={"4rem"}
                      h={"1.6rem"}
                      fontSize={"0.7rem"}
                    >
                      <Link to="/login">Login</Link>
                    </Button>
                    <Button
                      bg={"#01A95C"}
                      _hover={{ bg: "#20DF86" }}
                      color={"#fff"}
                      border={"1px solid #FFF"}
                      borderRadius={"0.3rem"}
                      w={"4rem"}
                      h={"1.6rem"}
                      fontSize={"0.7rem"}
                    >
                      <Link to="/register">Register</Link>
                    </Button>
                  </>
                )}
              </HStack>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
