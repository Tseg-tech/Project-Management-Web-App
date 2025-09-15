import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'

// components
import Avatar from "./Avatar"

// styles & images
//import "./Sidebar.css"
import {
  Box,
  UnorderedList, ListItem, Flex, Text
} from '@chakra-ui/react';
//import { MdOutlineMail } from "react-icons/md";
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'

export default function Sidebar() {
  const { user } = useAuthContext()

  return (
    <Box
      width="300px"
      minWidth="300px"
      bg="#1A1A1D"
      minHeight="100vh"
      boxSizing="border-box"
      position="relative"
      color="white"
      
    >
      <Box position="fixed" width="inherit">
        <Box
          fontWeight="bold"
          textAlign="center"
          letterSpacing="1px"
          px="30px"
          py="40px"
          borderBottom="1px solid rgba(255, 255, 255, 0.2)">
          <Avatar src={user.photoURL} />
          <p>{user.displayName}</p>
        </Box>
        <Box
          width="300px"
          minH="100vh"
          bg="#1A1A1D"
          color="white"
          p={4}
           
        >
          <UnorderedList mt="80px" ml="20px" listStyleType="none" m={0} p={0}>
            <ListItem>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                }
                style={{ textDecoration: "none" }}
              >
                <Flex align="center" gap={2}>
                  <img src={DashboardIcon} alt="dashboard icon" />
                  <Text color="inherit" fontWeight="inherit">Dashboard</Text>
                </Flex>
              </NavLink>
            </ListItem>

            <ListItem>
              <NavLink
                to="/create"
                className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                }
                style={{ textDecoration: "none" }}
              >
                <Flex align="center" gap={2}>
                  <img src={AddIcon} alt="add project icon" />
                  <Text color="inherit" fontWeight="inherit">New Project</Text>
                </Flex>
              </NavLink>
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>

    </Box>
  )
}