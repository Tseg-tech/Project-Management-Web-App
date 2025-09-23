// styles
//import './Avatar.css'
import { Box, Img } from '@chakra-ui/react'
export default function Avatar({ src }) {
  return (
    <Box
      display="inline-block"
      w="50px"
      h="50px"
      borderRadius="full"
      overflow="hidden"
    >
      <Img
        src={src}
        alt="user avatar"
        width="100%"
        height="100%"
        objectFit="cover"
      />
    </Box>
  )
}