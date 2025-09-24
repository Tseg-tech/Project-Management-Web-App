import { Box, Text, Button, Center } from '@chakra-ui/react'
import { useState } from 'react'

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

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
        bg="#f59e9e"
        borderRadius="4px"
        gap="8px"  // Adds spacing between children instead of using border-right logic
        flexDirection={{ base: "column", sm: "row" }} // Responsive layout
      >
        <Text fontSize="0.9em" mr={{ base: 0, sm: "10px" }} mb={{ base: "6px", sm: 0 }}>
          Filter by:
        </Text>

        {filterList.map((f) => (
          <Button
            key={f}
            onClick={() => handleClick(f)}
            variant="ghost"
            fontWeight="bold"
            fontSize="0.9em"
            color={currentFilter === f ? "blue.500" : "gray.700"}
            _hover={{ bg: "transparent", color: "blue.600" }}
            px="8px"
            py="4px"
          >
            {f}
          </Button>
        ))}
      </Box>
    </Box>

  )
}