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
      minWidth="300px"
      bg="#1A1A1D"
      minHeight="100vh"
      boxSizing="border-box"
      position="relative"
      color="white"

    >
      <Box position="fixed" width="inherit" >
        <Box
          fontWeight="bold"
          textAlign="center"
          letterSpacing="1px"
          px="30px"
          py="40px"
          borderBottom="1px solid rgba(255, 255, 255, 0.2)"
        >
          <Avatar src={user.photoURL} />
          <p>{user.displayName}</p>
        </Box>
        <Box

          marginTop="80px"
          marginLeft="20px"
        >
          <UnorderedList
            listStyleType="none"
            m={0} p={0}>
            <ListItem
              marginLeft="20px"
            >
              <NavLink

                to="/"
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
                      .active-link & img {
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
                  />
                  <Text color="inherit" fontWeight="inherit">Dashboard</Text>
                </Flex>
              </NavLink>
            </ListItem>

            <ListItem
              marginTop="10px"
              marginLeft="20px"
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
                  <Img src={AddIcon} alt="add project icon" />
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