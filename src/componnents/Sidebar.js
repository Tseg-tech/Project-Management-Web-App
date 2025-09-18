import { NavLink } from "react-router-dom"
import { useAuthContext } from '../hooks/useAuthContext'

// components
import Avatar from "./Avatar"

// styles & images
//import "./Sidebar.css"
import {
  Box,
  UnorderedList, ListItem, Flex, Text, Image,
  Img,
} from '@chakra-ui/react';
import { css } from '@emotion/react'

//import { MdOutlineMail } from "react-icons/md";
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'

export default function Sidebar() {
  const { user } = useAuthContext()

  return (
    <Box
      width="300px"
     // w="fit-content"
      minWidth="300px"
      bg="#f59e9eff"
      minHeight="100vh"
      boxSizing="border-box"
      position="relative"
      color="#0f0e0eff"


    >
      <Box position="fixed" width="inherit" >
        {/* <Box
          //w="fit-content"
          fontWeight="bold"
          textAlign="center"
          letterSpacing="1px"
          bg="#ede3e3ff"
          px="30px"
          py="40px"
          borderBottom="1px solid rgba(255, 255, 255, 0.2)"
          borderColor="#131313ff"
        >
          <Avatar src={user.photoURL} />
          <Text>{user.displayName}</Text>
        </Box> */}
        <Box as="nav"
          //bg="#4c0606ff"
          marginTop="80px"
          marginLeft="20px"

        // w="fit-content"
        >
          <UnorderedList
            listStyleType="none"
            m={0} p={0}>

            <ListItem

              marginLeft="20px"
              borderRadius="50px"
              bg="#ede3e3ff"
              w="fit-content"
            >
              <NavLink

                to="/"
                style={({ isActive }) => ({
                  color: isActive ? '#4c0606ff' : '#f59e9eff',
                  textDecoration: "none"
                })}
                className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                }
              >
              

                <Flex align="center" gap={2}
                  css={css`
                      img {
                        filter: invert(100%);
                      }
                      &.active-link & img {
                        filter: invert(40%);
                      }
                      &.active-link {
                        color: #555;
                        background: #86c232;
                        border-radius: 20px 0 0 20px;
                      }
                    `}
                >
                  <Image
                    src={DashboardIcon}
                    alt="dashboard icon"
                    ml="10px"
                    mt="10px"
                    mb="10px"
                  />
                  <Text color="inherit" fontWeight="bold" mr="20px" >Dashboard</Text>
                </Flex>
              </NavLink>
            </ListItem>

            <ListItem
              marginTop="10px"
              marginLeft="20px"
              borderRadius="50px"
              bg="#ede3e3ff"
              w="fit-content"
              
            >
              <NavLink

                to="/create"
                style={{ textDecoration: "none" }}
                className={({ isActive }) =>
                  isActive ? "active-link" : "inactive-link"
                }

              >
                <Flex align="center" gap={2}
                  css={css`
                          img {
                            filter: invert(100%);
                          }
                          &.active-link img {
                            filter: invert(40%);
                          }
                          &.active-link {
                            color: #555;
                            background: #86c232;
                            border-radius: 20px 0 0 20px;
                          }
                        `}
                >
                  <Img 
                  
                    ml="10px"
                    mt="10px"
                    mb="10px"
                    src={AddIcon} alt="add project icon" />
                  <Text color="inherit" fontWeight="bold" mr="20px">Create</Text>
                </Flex>
              </NavLink>
            </ListItem>
          </UnorderedList>
        </Box>
      </Box>

    </Box>
  )
}