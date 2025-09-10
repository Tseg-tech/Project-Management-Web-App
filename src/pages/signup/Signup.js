import { useState } from 'react'
import { useSignup } from '../../hooks/useSignup'
import { Box, Button, HStack } from '@chakra-ui/react';
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
    if (selected.size > 100000) {
      setThumbnailError('Image file size must be less than 100kb')
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
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Sign Up</h2>
        <label>
          <span>email:</span>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>password:</span>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <label>
          <span>display name:</span>
          <input
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            value={displayName}
          />
        </label>
        <label>
          <span>Profile thumbnail:</span>
          <input
            required
            type="file"
            onChange={handleFileChange}
          />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>

        <HStack wrap="wrap" gap="6"><Button
          type="submit"
          colorScheme="blue"
          width="full" 
          isLoading={isPending}
          loadingText="Loading"
          >
          Sign up
        </Button>
        </HStack>
        
        {error && <div className="error">{error}</div>}
      </form>
    </Box>
  )
}
