import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images  <img src={Temple} alt="dojo logo" />
//import './Navbar.css'
//import Temple from '../assets/temple.svg'
import {
  Box,
  Button,
  VStack,
  HStack,
  Stack,
  Separator,
  Text,
  Flex,
  Spacer,
  Group,
  Heading,
  List,
  ListItem

} from '@chakra-ui/react';
//import { DecorativeBox } from "compositions/lib/decorative-box"

import { SiAnalogue } from "react-icons/si"

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (

    <Box as="nav">
      <List >
        {!user && (
          <>
            <Flex gap="4" justify="space-between">
              <Box p="4">
                <HStack>
                  <Heading><SiAnalogue color="red" /> </Heading>
                  <Box as="span" fontWeight="bold">DMP</Box>
                </HStack>
              </Box>
              <Spacer />
              <Box p="4" >
                <HStack>
                  <Button
                    type="submit"
                    colorScheme="teal"
                  >
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="teal"
                  >
                    <Link to="/signup">Signup</Link>
                  </Button>
                </HStack>
              </Box>
            </Flex>

          </>
        )}

        {user && (
          <Flex>
            <Box p="4" ></Box>
            <Spacer/>
            <Box p="4">
          <ListItem>
            <Button
              colorScheme="teal"
              onClick={logout}
              isLoading={isPending}
              loadingText="Logging out..."
              //isDisabled={isPending}
              //{isPending ? "Logging out..." : "Logout"}
            >
              {isPending ? "Logging out..." : "Logout"}
              
            </Button>
          </ListItem>
          </Box>
          </Flex>

        )}
      </List>
    </Box>
  )
}
