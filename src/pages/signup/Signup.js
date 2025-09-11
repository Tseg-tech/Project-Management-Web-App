import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
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
  InputGroup,
} from '@chakra-ui/react';
import { MdOutlineMail } from "react-icons/md";
import { HiUpload } from "react-icons/hi"
// styles
//import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnail, setThumbnail] = useState(null)
  const [thumbnailError, setThumbnailError] = useState(null)
  const { signup, isPending, error } = useSignup()

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password, displayName, thumbnail)
  }

  const handleFileChange = (e) => {
    setThumbnail(null)
    let selected = e.target.files[0]
    console.log(selected)

    if (!selected) {
      setThumbnailError('Please select a file')
      return
    }
    if (!selected.type.includes('image')) {
      setThumbnailError('Selected file must be an image')
      return
    }
    if (selected.size > 1000000) {
      setThumbnailError('Image file size must be less than 1000kb')
      return
    }

    setThumbnailError(null)
    setThumbnail(selected)
    console.log('thumbnail updated')
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
    >
      <form onSubmit={handleSubmit} >
        <VStack spacing={5}>
          <Heading size="lg" textAlign="center" >Sign Up</Heading>
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

          <FormControl id="text" isRequired>
            <FormLabel>Display Name</FormLabel>
            <Input
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
              value={displayName}
            />
          </FormControl>

          <FormControl id="file" isRequired>
            <span>Profile Thumbnail:</span>
            <InputGroup startElement={<HiUpload />}>
              <Input
                type="file"
                onChange={handleFileChange}
              />
            </InputGroup>
            {thumbnailError && <div className="error">{thumbnailError}</div>}
          </FormControl>

          <Button
            type="submit"
            colorScheme="blue"
            width="full"
            isLoading={isPending}
            loadingText="Loading"
          >
            Sign up
          </Button>

          {error && <div className="error">{error}</div>}
        </VStack>
      </form>
    </Box>
  )
}
