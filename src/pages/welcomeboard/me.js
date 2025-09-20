import { Box, Text, Button, AbsoluteCenter,Heading } from '@chakra-ui/react';

export default function Welcome() {


    return (

        <Box
             width="100%"
             padding= "1rem"
             pt="25vh"
            
             
        >
            {/* <AbsoluteCenter> */}
            <Heading>Welcome aboard!</Heading>
            <Text >Hey, I'm Tseganeh! </Text>
            <Text mb="10px">Welcome! This onboarding will guide you through setting up projects, tracking progress, and collaborating effortlessly with your team.</Text>
            <Button asChild 
                color="white"
                colorScheme="teal"
                bg="green"
                variant="surface"
                
            >
                <a href="/login"> Get Started</a>
            </Button>
         
            {/* </AbsoluteCenter> */}

        </Box>


    )
}