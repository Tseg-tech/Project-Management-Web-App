import {  Link as RouterLink, useLocation } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import Avatar from "./Avatar"
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
  ListItem,
  Link as ChakraLink


} from '@chakra-ui/react';

//import { DecorativeBox } from "compositions/lib/decorative-box"

import { SiAnalogue } from "react-icons/si"

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (

    <Box as="nav">

      <List >
        {!user && (
          <>
            <Flex gap="4" justify="space-between">
              <Box p="4">
                <ChakraLink
                  as={RouterLink}
                  to="/welcomeboard"
                  _focus={{ boxShadow: "none" }}
                  cursor="pointer"
                  transition="all 0.2s"
            
                >
                  <HStack >
                    <Heading><SiAnalogue color="red" /> </Heading>
                    <Box as="span" _hover={{color: "blue.500",fontWeight: "normal"}} fontWeight= "bold">DMP</Box>
                  </HStack>
                </ChakraLink>
              </Box>
              <Spacer />
              <Box p="4" >
                <HStack >
                  <Text>
                    <ChakraLink
                      as={RouterLink}
                      to="/login"
                      textDecoration={isActive("/login") ? "underline" : "none"}
                      _hover={{ color: "blue.500", textDecoration: "underline" }}
                      color={isActive("/login") ? "green" : "black"}
                      _focus={{ boxShadow: "none", outline: "none" }} // 👈 This removes the box
                      transition="all 0.2s"
                      px="4"
                    >
                      Login
                    </ChakraLink>
                  </Text>
                  <Text>
                    <ChakraLink
                      as={RouterLink}
                      to="/signup"
                      textDecoration={isActive("/signup") ? "underline" : "none"}
                      _hover={{ color: "blue.500", textDecoration: "underline" }}
                      color={isActive("/signup") ? "green" : "black"}
                      _focus={{ boxShadow: "none", outline: "none" }} // 👈 This removes the box
                      transition="all 0.2s"
                      px="4"
                    >
                      Sign up
                    </ChakraLink>
                  </Text>
                </HStack>
              </Box>
            </Flex>
          </>
        )}

        {user && (

          <Flex>
            <Box p="4">
              <HStack>
                <Heading><SiAnalogue color="red" /> </Heading>
                <Box as="span" fontWeight="bold">DMP</Box>
              </HStack>
            </Box>
            <Spacer />
            <Spacer />
            <Box p="4" >
              <ListItem>
                <HStack>
                  <Box
                    colorPalette="blue"
                    bg={{ base: "colorPalette.600", _dark: "colorPalette.400" }}
                    display="flex"
                    alignItems="center"
                  >
                    <Text mr="10px" ml="10px">{user.displayName}</Text>
                    <Avatar src={user.photoURL} />

                  </Box>
                  <Button
                    // colorScheme="pink"
                    //bg="#f59e9eff"
                    onClick={logout}
                    isLoading={isPending}
                    loadingText="Logging out..."
                  //isDisabled={isPending}
                  //{isPending ? "Logging out..." : "Logout"}
                  >
                    {isPending ? "Logging out..." : "Logout"}

                  </Button>

                </HStack>
              </ListItem>
            </Box>
          </Flex>

        )}
      </List>
    </Box>
  )
}
