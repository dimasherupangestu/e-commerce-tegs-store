/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Text
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import { Controller } from "react-hook-form";
import { API } from "../../../libs/axios";
import { useStore } from "../../../store/useStore";
import { FaArrowLeft } from "react-icons/fa6";
import { useFormRegister } from "../hooks/useFormRegister";
import { useNavigate } from "react-router-dom";

interface FormRegisterProps {
    onBack: () => void;
}

export const FormRegister = ({ onBack }: FormRegisterProps) => {
    const { control, handleSubmit} = useFormRegister();
    const { email } = useStore(state => ({ email: state.email }));

    const navigate = useNavigate();

    const onSubmit = async (data: any) => {
        try {
          const response = await API.post('/users/register', { email, full_name: data.full_name, password: data.password });
          console.log(response)
          toast.success("Registered successfully");
          navigate('/login')
        } catch (error: any) {
            console.log(error)
          toast.error(error.response.data);
        }
    };

    return (
        <Box
            w={{ base: "90%", sm: "60%", md: "5 0%" }}
            mx="auto"
            mt={8}
            p={6}
            borderWidth={1}
            borderRadius="md"
            boxShadow="md"
        >
            <Flex flexDirection="column" mb={4} textAlign="center" justifyContent="center" alignItems="center">
                <Flex justifyContent={"left"} alignItems={"start"} mr={"210px"} mb={"30px"} onClick={onBack}>
                    <FaArrowLeft fontSize={"25px"}/>
                    <Text w={"200px"} fontWeight={"bold"}>Daftar dengan email</Text>
                </Flex>
            </Flex>
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel fontSize={"1rem"}>Email</FormLabel>
                    <Input type="email" placeholder="Email" value={email} disabled/>
                </FormControl>
                <Controller
                    name="full_name"
                    control={control}
                    render={({ field, fieldState }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                        <FormLabel fontSize={"1rem"} mt={5}>Full Name</FormLabel>
                        <Input type="text" placeholder="Full Name" {...field} />
                        <FormErrorMessage>
                            {fieldState.error?.message}
                        </FormErrorMessage>
                    </FormControl>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                    <FormControl isInvalid={fieldState.invalid}>
                        <FormLabel fontSize={"1rem"} mt={5}>Password</FormLabel>
                        <Input type="password" placeholder="Enter code" {...field} />
                        <FormErrorMessage>
                            {fieldState.error?.message}
                        </FormErrorMessage>
                    </FormControl>
                    )}
                />
                    <Button
                    bg={"brand.primary"}
                    w={"100%"}
                    mt={5}
                    color={"#fff"}
                    _hover={{ bg: "green.400" }}
                    type="submit"
                    >
                    Submit
                    </Button>
            </form>
        </Box>
    );
};
