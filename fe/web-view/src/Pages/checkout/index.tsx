import { Box, Text } from "@chakra-ui/react"
import Product from "./component/product"
import { Layout } from "../../Layout"
import Address from "./component/address"
import Delivery from "./component/delivery"
import TotalPayment from "./component/total-payment"
import useAuthStore from "../../store/useAuthStore"

import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

const Checkout = () => {
    const user = useAuthStore((state) => state.user)
   const naviget = useNavigate()
    if(user?.city == null){
        toast.error("Please fill your address first")
        naviget('/user')
    }
    return (
        <>  
            <Layout>
                <Box w={"80%"} mx={"auto"} mt={10}>
                    <Text fontSize={"1.5rem"} fontWeight={700} textAlign={{ base: "center", md: "left"}}>Your Product Ordered</Text>
                    <Box mt={10}>
                        <Product />
                    </Box>
                    <Box mt={10}>
                        <Address />
                    </Box>
                    <Box mt={10}>
                        <Delivery />
                    </Box>
                    <Box mt={10}>
                        <TotalPayment />
                    </Box>
                </Box>
            </Layout>
        </>
    )
}

export default Checkout