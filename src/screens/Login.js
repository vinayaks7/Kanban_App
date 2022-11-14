import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { React, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, setloginPassword] = useState([]);
  const [input_username, setInputUserName] = useState('');
  const [input_password, setInputPassword] = useState('');
  const [toast_result, setToastResult] = useState([]);
  const navigate = useNavigate();
  const toast = useToast();

  const handleShowClick = () => setShowPassword(!showPassword);
  const onChangeUserName = event => {
    setInputUserName(event.target.value);
  };
  const onChangePassword = event => {
    setInputPassword(event.target.value);
  };

  const navigateHome = () => {
    // 👇️ navigate to /
    navigate('/app');
  };
  window.history.forward();

  const compare_single_user = async () => {
    if (input_username && input_password) {
      let res = await fetch(
        `http://127.0.0.1:8000/test/compare_single_user/?user_name=${input_username}&password=${input_password}`,
        {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );
      res = await res.json();
      console.log(res);
      setloginPassword(res);
      if (res.message === 'Success') {
        setInputUserName();
        //   setToastResult('Logged in');
        navigateHome();
      } else {
        toast({ description: 'Wrong password' });
      }
    } else {
      toast({ description: 'Please fill all the fields' });
    }
  };
  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundColor="gray.200"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        flexDir="column"
        mb="2"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar bg="#000000" />
        <Heading color="#000000">Welcome</Heading>
        <Box minW={{ base: '90%', md: '468px' }}>
          <form>
            <Stack
              spacing={4}
              p="1rem"
              backgroundColor="whiteAlpha.900"
              boxShadow="md"
            >
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" />
                  <Input
                    type="text"
                    placeholder="user name"
                    onChange={onChangeUserName}
                    value={input_username}
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={input_password}
                    onChange={onChangePassword}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="button"
                variant="solid"
                width="full"
                onClick={() => {
                  compare_single_user();
                  //   toast({
                  //     title: { toast_result },
                  //     description: "We've created your account for you.",
                  //     status: 'success',
                  //     duration: 9000,
                  //     isClosable: true,
                  //   });
                }}
              >
                Login
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
