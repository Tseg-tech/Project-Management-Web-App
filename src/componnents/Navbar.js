import { Link, Link as RouterLink, useLocation } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { NavLink } from "react-router-dom"
import { css } from '@emotion/react'
import Avatar from "./Avatar"

import { useRef, useEffect } from "react";

//import Dashboard from './pages/dashboard/Dashboard'
// styles & images  <img src={Temple} alt="dojo logo" />
//import './Navbar.css'
//import Temple from '../assets/temple.svg'
import { useState } from "react";
import {
  Box,
  Button,
  VStack,
  HStack,
  Stack,

  UnorderedList, Img,
  Separator,
  Text,
  Flex,
  Spacer,
  Group,
  Heading,
  List,
  ListItem,
  Link as ChakraLink,
  useDisclosure,
  Image, IconButton,
  AbsoluteCenter,

} from '@chakra-ui/react';

import HamburgerIconImg from '../assets/hamburger-menu.svg'; // or .png/.jpg

//import { DecorativeBox } from "compositions/lib/decorative-box"

import { SiAnalogue } from "react-icons/si"
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'



export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  const location = useLocation();
  const path = location.pathname;

  const isActive = (path) => location.pathname === path;
  // const { isOpen, onToggle } = useDisclosure();
  const [clicked, setClicked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    setClicked(true);
  };
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    //<Stack direction={{ base: "column", md: "row" }} gap="10">
    //  <AbsoluteCenter> 
    <Box
      as="nav"
      //boxShadow="md"
      //bg="bg.muted"
      px={6}
      py={4}
      position="relative"
    // borderRadius="md"
    >


      {/* Auth Links (When Logged Out) */}
      {!user && (
        <Flex
          maxW="1200px"
          mx="auto"
          align="center"
          justify="space-between"
          flexWrap="wrap"
        >
          {/* Logo */}
          <HStack spacing={2}>
            <SiAnalogue color="red" size={28} />
            <ChakraLink
              as={RouterLink}
              to="/welcomeboard"
              _hover={{ textDecoration: "none", color: "blue.500" }}
              _focus={{ boxShadow: "none", outline: "none" }}
            >
              <Text
                fontWeight="bold"
                fontSize="xl"
                borderBottom={isActive("/welcomeboard", path) ? "2px solid green" : "none"}
                _focus={{ boxShadow: "none", outline: "none" }}
              >
                DMP
              </Text>
            </ChakraLink>
          </HStack>
          <HStack spacing={4}>
            <ChakraLink
              as={RouterLink}
              to="/login"
              borderBottom={isActive("/login", path) ? "2px solid green" : "none"}
              _hover={{ color: "blue.500", textDecoration: "none" }}
              _focus={{ boxShadow: "none", outline: "none" }}
            >
              Login
            </ChakraLink>
            <ChakraLink
              as={RouterLink}
              to="/signup"
              borderBottom={isActive("/signup", path) ? "2px solid green" : "none"}
              _hover={{ color: "blue.500", textDecoration: "none" }}
              _focus={{ boxShadow: "none", outline: "none" }}
            >
              Sign up
            </ChakraLink>
          </HStack> </Flex>
      )}

      {/* Authenticated Links (When Logged In) */}
      {user && (
        <Flex
          maxW="1200px"
          mx="auto"
          align="center"
          justify="space-between"
          flexWrap="wrap"
        >
          {/* <Flex align="center" gap={6} wrap="wrap"> */}
          <HStack spacing={4}>
            <ChakraLink
              as={RouterLink}
              to="/dashboard"
              _hover={{ textDecoration: "none", color: "blue.500" }}
              _focus={{ boxShadow: "none", outline: "none" }}
            >
              <Flex align="center" gap={2} >
                <Image src={DashboardIcon} alt="dashboard icon" boxSize="24px" />
                <Text
                  borderBottom={isActive("/dashboard", path) ? "2px solid green" : "none"}
                >
                  Dashboard
                </Text>
              </Flex>
            </ChakraLink>
          </HStack>

          <HStack spacing={4}>
            <ChakraLink
              as={RouterLink}
              to="/create"
              _hover={{ textDecoration: "none", color: "blue.500" }}
              _focus={{ boxShadow: "none", outline: "none" }}
              
            >
              <Flex align="center" gap={2} >
                <Image src={AddIcon} alt="add project icon" boxSize="24px" />
                <Text
                  borderBottom={isActive("/create", path) ? "2px solid green" : "none"}
                >
                  Create
                </Text>
              </Flex>
            </ChakraLink>
            {/* <HStack> */}
            {/* <Text borderBottom={isOpen ? "2px solid green" : "none"}>{user.displayName}</Text> */}
            {/* </HStack> */}
            <Box ref={dropdownRef}>
              <HStack>
                <IconButton
                  icon={<span>{<Avatar size="sm" src={user.photoURL} />}</span>}
                  onClick={() => setIsOpen(!isOpen)}
                  aria-label="Toggle"

                  //right={{ base: "10px", md: "20px" }}
                  size="lg"
                  border={isOpen ? "2px solid white" : "none"}
                  borderRadius="full"
                  colorScheme="white"
                  
                  zIndex="1100"
                  _focus={{ boxShadow: "none", outline: "none" }}
                />
              </HStack>

              {isOpen && (
                <Box
                  position="absolute"
                  top="100%"         // Drop straight below the icon
                  right="0"          // Align right edges
                  w="260px"
                 _hover={{ textDecoration: "none", color: "blue.500" }}
                  _focus={{ boxShadow: "none", outline: "none" }}

                >
                  <Flex justify="center" >
                  <Text size="sm" display="inline-block"  >
                    Hi,<Text display="inline-block" borderBottom={isOpen ? "2px solid black" : "none"}> {user.displayName}!</Text>
                  </Text>
                  </Flex>
                  {/* User Info + Logout */}
                  <Box display="grid" alignItems="center" justifyContent="center">
                    {/* <Box > */}
                    <Button
                      w="fit-content"
                      colorScheme="transparent"
                      color="black"
                      mb="10px"
                    >
                      manage your account
                    </Button>
                    <Button
                      ml="50px"
                      mr="50px"
                      w="fit-content"
                      colorScheme="teal"
                      onClick={logout}
                      isLoading={isPending}
                      loadingText="Logging out..."
                      _focus={{ boxShadow: "none", outline: "none" }}
                    >
                      Logout
                    </Button>
                    {/* </Box> */}
                  </Box>

                </Box>
              )}
              </Box>
          </HStack>
        
         
        </Flex>
    // </Flex>
  )
}


    </Box >

  )
}
