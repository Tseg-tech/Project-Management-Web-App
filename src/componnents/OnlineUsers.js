import { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
//import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useCollection } from '../hooks/useCollection';
import Avatar from './Avatar';

export default function OnlineUsers() {
  const { isPending, error, documents } = useCollection('users');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <IconButton
        icon={<span>{isOpen ? '🙈' : '👁️'}</span>}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle"
        position="fixed"
        bottom="20px"
        right="20px"
        size="lg"
        borderRadius="full"
        colorScheme="green"
      />


      {/* User List Box */}
      {isOpen && (
        <Box
          position="fixed"
          bottom="80px" // slightly above the button
          right="20px"
          w="fit-content"
          maxW="90vw"
          p="30px"
          bg="#c8f078ff"
          color="var(--heading-color)"
          borderRadius="10px"
          boxShadow="md"
          zIndex="1000"
        >
          <Heading
            textAlign="right"
            mb="20px"
            pb="10px"
            borderBottom="1px solid #eeeeee"
            fontSize="1.2em"
          >
            All Users
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
                <Text>{user.displayName}</Text>
                <Avatar
                  src={user.photoURL}
                  ml="10px"
                  w="40px"
                  h="40px"
                />
              </Box>
            ))}
        </Box>
      )}
    </>
  );
}
