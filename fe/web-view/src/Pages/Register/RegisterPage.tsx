import { useState } from "react";
import { Box, Center, Flex, Image } from "@chakra-ui/react";
import { FormReqVerify } from "./components/FormReqVerify";
import { FormVerifyEmail } from "./components/FormVerifyEmail";
import { FormRegister } from "./components/FormRegister";
import { useStore } from "../../store/useStore";

export const RegisterPage = () => {
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const resetEmail = useStore(state => state.resetEmail);

  const handleVerificationSuccess = () => {
    setIsVerificationSent(true);
  };

  const handleEmailVerified = () => {
    setIsEmailVerified(true);
  };

  const handleBack = () => {
    setIsVerificationSent(false);
    setIsEmailVerified(false);
    resetEmail();
};

  return (
    <Box w={"100%"} h={"100vh"} minHeight={"100%"}>
      <Box w={"100%"} h={"100%"} bg={"#fff"}>
        <Center mx={"auto"} mt={5}>
          <Image
            src="../../src/assets/img/logo3.png"
            w={"18rem"}
            h={"3.7rem"}
          />
        </Center>
        <Flex w={"90%"} mx={"auto"} mt={5} flexWrap={"wrap"}>
          <Box
            w={{ base: "100%", md: "100%", lg: "55%", xl: "55%" }}
            h={"35rem"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Image
              src="../../src/assets/img/regis.gif"
              w={"90%"}
              h={"90%"}
            ></Image>
          </Box>
          <Box
            w={{ base: "100%", md: "100%", lg: "45%", xl: "45%" }}
            h={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            // bg={"green"}
            m={"auto"}
          >
            {!isVerificationSent ? (
              <FormReqVerify onVerificationSuccess={handleVerificationSuccess} />
            ) : !isEmailVerified ? (
              <FormVerifyEmail onBack={handleBack} onEmailVerified={handleEmailVerified} />
            ) : (
              <FormRegister onBack={handleBack}/>
            )}
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
