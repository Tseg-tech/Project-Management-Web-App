import { useState } from 'react';
import ChatMessage from '../pages/chatmessage/chatMessage'
import {
  Box,
  Heading,
  Text,
  Spinner,
  IconButton,
  Button,
} from '@chakra-ui/react';

import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';

export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection('users');
  const [isOpen, setIsOpen] = useState(false);

 const [clicked, setClicked] = useState(false);
 
   
 const message ="hello" 

  const handleClick = (message) => {
      setClicked(prev => !prev);
     console.log( <ChatMessage />)
    };
  return (
    <>
    {/* <Button onclick={ setClicked() }/> */}
     {/* <Button onClick= {handleClick }>{clicked ? 'Clicked!' : 'Click me'}</Button> */}
      {/* Toggle Button */}
      <IconButton
        icon={<span>{isOpen ? '🙈' : '👁️'}</span>}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle"
        position="fixed"
        bottom="20px"
        right={{ base: "10px", md: "20px" }}
        size="lg"
        borderRadius="full"
        colorScheme="pink"
        bg="#f77c7c"
        zIndex="1100"
      />
      
      {/* User List Box */}
      {isOpen && (
       
        <Box
          position="fixed"
          bottom={{ base: "70px", md: "80px" }} // slightly above the button, a bit closer on small screens
          right={{ base: "10px", md: "20px" }}
          w={{ base: "90vw", sm: "400px", md: "auto" }}
          maxW="90vw"
          p={{ base: "20px", md: "30px" }}
          bg="#f77c7c"
          color="#080808"
          borderRadius="10px"
          boxShadow="md"
          zIndex="1000"
          overflowY="auto"
          maxH={{ base: "50vh", md: "auto" }} // max height and scroll on small devices
        >
          <Heading
            textAlign="center"
            mb="20px"
            pb="10px"
            borderBottom="1px solid #eeeeee"
            fontSize="1.2em"
          >
            Users
          </Heading>

          {isPending && <Spinner size="sm" color="green.500" />}
          {error && <Text color="red.500">{error}</Text>}

          {documents &&
            documents.map((user) => (
              <Box
                key={user.id}
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                mb="12px"
              >
                {user.online && (
                  <Box
                    display="inline-block"
                    mr="10px"
                    mt="2px"
                    w="12px"
                    h="12px"
                    bg="#0ebb50"
                    borderRadius="50%"
                  />
                )}
                {/* <Button onclick={ setClicked() }> */}
                <Text color="#080808" mr="10px" isTruncated maxW="150px">
                  {user.displayName}
                </Text>
                <Avatar src={user.photoURL} size="sm" ml="10px" w="40px" h="40px" />
                {/* </Button> */}

              </Box>
            ))}
        </Box>
      )}
    </>

  )
}
