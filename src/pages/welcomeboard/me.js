import { Box, Text, Button, AbsoluteCenter, Heading, AspectRatio} from '@chakra-ui/react';
import { FaChild } from "react-icons/fa"
export default function Welcome() {


    return (

        <Box
            width="100%"
            padding="1rem"
            pt="25vh"


        >
            {/* <AbsoluteCenter> */}
            <Heading>Welcome aboard!</Heading>
            <Text display="flex" alignItems="center" justifyContent="flex-start">Hey, I'm Tseganeh! {<FaChild className="size-6 text-blue-500" />} </Text>
            <Text mb="10px">Welcome! This onboarding will guide you through setting up projects, tracking progress, and collaborating effortlessly with your team.</Text>
            <Button asChild
                color="white"
                colorScheme="teal"
                bg="green"
                variant="surface"
                mb="10px"

            >
                <a href="/login"> Get Started</a>
            </Button>

            <AspectRatio maxW="560px" ratio={16 / 9}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.375295414770757!3d6.5276316452784755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1567723392506!5m2!1sen!2sng" />
            </AspectRatio>

            {/* </AbsoluteCenter> */}

        </Box>


    )
}