// styles
//import './Avatar.css'
import { Box, Img } from '@chakra-ui/react'
export default function Avatar({ src }) {
  return (
    <Box
      sx={{
        display: "inline-block",
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        overflow: "hidden"
      }}
    >
      <Img
        src={src}
        alt="user avatar"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover"
        }}
      />
    </Box>
  )
}