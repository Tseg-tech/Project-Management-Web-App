import { Box, Text, Button, Link as ChakraLink, } from '@chakra-ui/react';

import { Link, Link as RouterLink, useLocation } from 'react-router-dom'
import { BeatLoader } from "react-spinners"


export default function Welcome() {

    const location = useLocation();
    const isActive = (path) => location.pathname === path;
    return (

        <Box
            maxW="400px"
            mx="auto"
            mt={12}
            p={6}
        >
            <Text mb="10px">Hey, I'm Tseganeh</Text>
            {/* <Button
                size="md"
                type="submit"
                variant="plain"
                color="white"
                bg="green"
                rounded="2xl"
            >

                <ChakraLink
                    as={RouterLink}
                    to="/login"

                    fontWeight="bold"
                    _focus={{ boxShadow: "none" }}
                    transition="all 0.3s ease"

                >
                    Get Started
                </ChakraLink>
            </Button> */}
            <Button asChild  color="white"
                bg="green"
              //  variant="solid"
                colorPalette="light-green" 
                variant="surface"
                >
                <a href="/login"> Get Started</a>
            </Button>

            

        </Box>

    )
}