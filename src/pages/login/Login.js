import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  InputGroup, Popover,
  Portal,
  Text,
  Theme,
} from '@chakra-ui/react';
import { MdOutlineMail } from "react-icons/md";
// styles
//import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isPending } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(email, password)
  }

  return (

    <Box
      width="100%"
      maxW="400px"
      mx="auto"
      mt={12}
      padding= "1rem"
      // p={6}
      bg="rgba(255, 255, 255, 0.1)"  // light transparent white
      backdropFilter="blur(10px)"    // adds blur effect (like glass)
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="md"
     
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <Heading size="lg" textAlign="center" >
            Login
          </Heading>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <InputGroup startElement={<MdOutlineMail />}>
              <Input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </FormControl>

          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button
            type="submit"
            colorScheme="teal"
            bg="green"
            variant="surface"
            color="white"
            width="full"
            isLoading={isPending}
            loadingText="Loading"
          >
            Log in
          </Button>

          {error && (
            <Alert status="error" borderRadius="md" width="full">
              <AlertIcon />
              {error}
            </Alert>
          )}
        </VStack>
      </form>
    </Box>
  )
}