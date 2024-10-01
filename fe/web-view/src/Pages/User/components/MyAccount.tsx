import { Avatar, Box, Button, Center, Flex, FormControl, Heading, Input, InputGroup, InputLeftElement, Stack, Text } from "@chakra-ui/react";
import { CiUser } from "react-icons/ci";
import { LuMapPin } from "react-icons/lu";
import { MdEdit, MdEmail, MdOutlinePhone } from "react-icons/md";
import useEditProfile from "../hooks/useUser";

const MyAccount = () => {
  const { data, handleChange, handleEditProfile, photo_profile_ref } = useEditProfile();

  const photoProfileUrl = data.photo_profile instanceof File
    ? URL.createObjectURL(data.photo_profile)
    : data.photo_profile || "https://bit.ly/dan-abramov";

  return (
    <Box w={"1000px"} h={"100%"}>
      <Heading size="lg" whiteSpace={"nowrap"}>My Account</Heading>
      <FormControl>
        <Box mt={3} position={"relative"} marginTop={"20px"}>
          <Avatar
            name={data.full_name || "User"}
            src={photoProfileUrl}
            size={"xl"}
          />
          <Center
            w={"3rem"}
            h={"2rem"}
            borderRadius={"50%"}
            bg={"rgba(0, 0, 0, 0.6)"}
            as="label"
            pos={"absolute"}
            top={61}
            left={14}
          >
            <MdEdit size={28} color="#00AA5B" />
            <Input
              type="file"
              hidden
              ref={photo_profile_ref}
              accept="image/jpg,image/png,image/jpeg"
              name="photo_profile"
              onChange={handleChange}
            />
          </Center>
        </Box>
        <Flex justifyContent={"space-between"} gap={10} w="100%">
          <Box w="100%">
            <Stack spacing={4} mt={5}>
              <Text mb={-3} color={"gray.500"}>Full Name</Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <CiUser color='gray.300' />
                </InputLeftElement>
                <Input
                  type='text'
                  variant="flushed"
                  placeholder='Enter your full name'
                  name='full_name'
                  value={data.full_name || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <Text mb={-3} mt={3} color={"gray.500"}>Number Phone</Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <MdOutlinePhone color='gray.300' />
                </InputLeftElement>
                <Input
                  type='text'
                  variant="flushed"
                  placeholder='Enter your phone number'
                  name='phone_number'
                  value={data.phone_number || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <Text mb={-3} mt={3} color={"gray.500"}>Province</Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <LuMapPin color='gray.300' />
                </InputLeftElement>
                <Input
                  type='text'
                  variant="flushed"
                  placeholder='Enter your province'
                  name='province'
                  value={data.province || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <Text mb={-3} mt={3} color={"gray.500"}>Street</Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <LuMapPin color='gray.300' />
                </InputLeftElement>
                <Input
                  type='text'
                  variant="flushed"
                  placeholder='Street'
                  name='street'
                  value={data.street || ""}
                  onChange={handleChange}
                />
              </InputGroup>
            </Stack>
          </Box>

          <Box w="100%">
            <Stack spacing={4} mt={5}>
              <Text mb={-3} color={"gray.500"}>Email</Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <MdEmail color='gray.300' />
                </InputLeftElement>
                <Input
                  type='text'
                  variant="flushed"
                  placeholder='Email'
                  name='email'
                  value={data.email || ""}
                  isReadOnly
                />
              </InputGroup>

              <Text mb={-3} mt={3} color={"gray.500"}>Country</Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <LuMapPin color='gray.300' />
                </InputLeftElement>
                <Input
                  type='text'
                  variant="flushed"
                  placeholder='Country'
                  name='country'
                  value={data.country || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <Text mb={-3} mt={3} color={"gray.500"}>City</Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <LuMapPin color='gray.300' />
                </InputLeftElement>
                <Input
                  type='text'
                  variant="flushed"
                  placeholder='Enter your city'
                  name='city'
                  value={data.city || ""}
                  onChange={handleChange}
                />
              </InputGroup>

              <Text mb={-3} mt={3} color={"gray.500"}>Postal Code</Text>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <LuMapPin color='gray.300' />
                </InputLeftElement>
                <Input
                  type='text'
                  variant="flushed"
                  placeholder='Enter your postal code'
                  name='postal_code'
                  value={data.postal_code || ""}
                  onChange={handleChange}
                />
              </InputGroup>
            </Stack>
          </Box>
        </Flex>
        <Button mt={5} colorScheme="blue" onClick={handleEditProfile}>Update Profile</Button>
      </FormControl>
    </Box>
  );
};

export default MyAccount;
