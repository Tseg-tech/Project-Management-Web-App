import { useState } from 'react'
import { useLogin } from '../../hooks/useLogin'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
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
      maxW="400px"
      mx="auto"
      mt={12}
      p={6}
      bg="rgba(255, 255, 255, 0.1)"  // light transparent white
      backdropFilter="blur(10px)"    // adds blur effect (like glass)
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
      boxShadow="md"
      //bgImage="url('/tseg.jpg')"
      bgSize= "100% 100%"
      bgPosition="center"
      bgRepeat="no-repeat"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={5}>
          <Heading size="lg" textAlign="center">
            Login
          </Heading>

          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
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
            colorScheme="blue"
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