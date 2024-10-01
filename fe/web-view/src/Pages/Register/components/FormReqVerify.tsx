/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { Controller } from "react-hook-form";
import { useRequestVerificationValidation } from "../hooks/useReqVerify";
import { API } from "../../../libs/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useStore } from "../../../store/useStore";

interface FormReqVerifyProps {
  onVerificationSuccess: () => void;
}

export const FormReqVerify = ({ onVerificationSuccess }: FormReqVerifyProps) => {
  const { setEmail } = useStore(state => ({ setEmail: state.setEmail, resetEmail: state.resetEmail }));
  const { control, handleSubmit } = useRequestVerificationValidation();

  const onSubmit = async (data: any) => {
    console.log('data', data);
    try {
      const res = await API.post('/request-verification', { email: data.email });
      console.log('res', res);
      toast.success("Token has been sent, check your email!");
      setEmail(data.email);
      onVerificationSuccess();
    } catch (error) {
      toast.error("An error occurred while sending the verification email.");
    }
  }

  return (
    <Box w={"100%"} h={"100%"}>
      <Box
        w={{ base: "100%", md: "100%", lg: "24rem" }}
        h={"100%"}
        bg={"#fff"}
        mx={"auto"}
        boxShadow={"lg"}
        px={5}
        py={2}
        borderRadius={"8px"}
      >
        <Text fontSize={"1.5rem"} mt={3} fontWeight={700} textAlign={"center"}>
          Register Now
        </Text>
        <HStack textAlign={"center"} mt={2}>
          <Text fontSize={"0.8rem"} mx={"auto"} textAlign={"center"}>
            Already have a Tegs Store account?{" "}
            <Link to={"/login"}>
              <span
                style={{
                  color: "#00AA5B",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  marginLeft: "2px",
                }}
              >
                Login
              </span>
            </Link>
          </Text>
        </HStack>
        <Box mt={5} mx={"auto"} w={"90%"}>
          <Button
            w={"100%"}
            leftIcon={<FcGoogle size={25} />}
            variant="outline"
            onClick={() => window.location.href = "http://localhost:5000/auth/google"}
          >
            <Text fontWeight={500}> Google</Text>
          </Button>
        </Box>
        <Text fontSize={"0.8rem"} color={"#bdb4c8"} textAlign={"center"} mt={3}>
          or list with
        </Text>

        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              validate: value =>
                value === "fre@gmail.com" || "Email must be fre@gmail.com"
            }}
            render={({ field, fieldState }) => (
              <FormControl isInvalid={fieldState.invalid}>
                <FormLabel fontSize={"1rem"}>Email </FormLabel>
                <Input type="email" placeholder="Email" {...field} />
                {fieldState.error ? (
                  <FormErrorMessage>
                    {fieldState.error.message}
                  </FormErrorMessage>
                ) : (
                  <FormHelperText>Example: email@TagsStore.com</FormHelperText>
                )}
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
            Register
          </Button>
        </Box>

        <Text fontSize={"0.8rem"} color={"#aaa"} textAlign={"center"} mt={3} pb={4}>
          By registering, I agree to Terms and Conditions and Privacy Policy
        </Text>
      </Box>
    </Box>
  );
};
