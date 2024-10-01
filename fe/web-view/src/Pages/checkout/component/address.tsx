import { Box, Button, Divider, Flex, Text } from "@chakra-ui/react"
import { FaMapMarkerAlt } from "react-icons/fa"
import useAuthStore from "../../../store/useAuthStore"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Address = () => {
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()
    if(user?.city == null){
        toast.error("Please fill your address first")
        navigate('/user')
    }

    // console.log("user in address", user)
    return (
        <Box>
            <Flex alignItems={"center"} gap={2}>
                <Text>
                    <FaMapMarkerAlt />
                </Text>
                <Text fontWeight={"bold"}>
                    Your Address
                </Text>       
            </Flex>
            <Box mt={5} border={"0px solid grey"}p={5} bgColor={"#f0f0f0"} borderRadius={"10px"}>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Text>{user?.full_name} | (+62){user?.phone_number}</Text>
                    <Button colorScheme={"whatsapp"} onClick={() => navigate('/user')}>Edit</Button>
                </Flex>
                <Divider orientation='horizontal' mt={2} mb={4}
                css={{
                    borderColor: "black",
                    borderWidth: "2px",
                    fontWeight: "bold"
                }}
                />
                <Text>{user?.street} | Kode Pos : {user?.postal_code} | {user?.city} | {user?.province} | {user?.country}</Text>
            </Box>
        </Box>
    )
}

export default Address