import { Box, Text, Button, Center } from '@chakra-ui/react'
import { useState } from 'react'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales','history']

export default function ProjectFilter({ changeFilter }) {
  const [currentFilter, setCurrentFilter] = useState('all')

  const handleClick = (newFilter) => {
    setCurrentFilter(newFilter)
    changeFilter(newFilter)
  }

  return (
    <Box my="20px" mx="auto">
      <Box
        as="nav"
        my="20px"
        mx="auto"
        display="flex"
        flexWrap="wrap"
        justifyContent="space-evenly"
        alignItems="center"  // ✅ lowercase 'center'
        p="10px"
        bg="#f77c7c"
        borderRadius="4px"
        gap="8px"  // Adds spacing between children instead of using border-right logic
        flexDirection={{ base: "column", sm: "row" }} // Responsive layout
      >
        <Text color="#080808" fontSize="0.9em" fontWeight="bold" mr={{ base: 0, sm: "10px" }} mb={{ base: "6px", sm: 0 }}>
          Filter By:
        </Text>

        {filterList.map((f) => (
          <Button
            key={f}
            onClick={() => handleClick(f)}
            variant="plain"
            fontWeight={currentFilter === f ? "bold":"normal"}
            fontSize="0.9em"
            color= "#080808"
            _hover={{ bg: "transparent", color: "black" }}
            px="8px"
            py="4px"
            _focus={{ boxShadow: "none", outline: "none" }}
          >
            {f}
          </Button>
        ))}
      </Box>
    </Box>

  )
}