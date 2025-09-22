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
    <Box
      my="20px" mx="auto"
    >
      <Box as="nav"
        my="20px"
        mx="auto"
        display="flex"
        justifyContent="space-evenly"
        p="10px"
        bg="#f59e9eff"
        borderRadius="4px"
        alignItems="Center"
        
      >
        <Text fontSize="0.9em" mr="10px" alignItems="Center">Filter by: </Text>
        {filterList.map((f, index) => (
          <Button
            key={f}
            onClick={() => handleClick(f)}
            background="transparent"
            border="0"
            fontFamily="inherit"
            fontWeight="bold"
            cursor="pointer"
            borderRight={index === filterList.length - 1 ? "0" : "1px solid #e4e4e4"}
            fontSize="0.9em"
            color={currentFilter === f ? "var(--primary-color)" : "var(--text-color)"}
            _hover={{ bg: "transparent" }}
            px="8px"
            py="4px"
          >
            {f}
          </Button>
        ))}
      </Box >
    </Box>
  )
}