import { useAuthContext } from '../../hooks/useAuthContext'
import {
  Box,
  Button,
  Input
} from '@chakra-ui/react';
import Avatar from "../../componnents/Avatar";

export default function ChatMessage(props) {
  const a = props.send;
 const rawMessage = props.message;


  return (
    <Box
      w="100%"
      maxW="1200px"
      mr="210px"
      position="fixed"
      display="flex"
      alignItems="center"
      width="300px"
      justifyContent="center"
      bottom="80px"
      right={{ base: "10px", md: "20px" }}
      zIndex="1000"
    >
      <Button ml="10px">{rawMessage}</Button>
      <Input ml="10px" border="2px solid #000" placeholder={a} />
    </Box>
  );
}
