import { useCollection } from '../../hooks/useCollection'
import { useState } from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'

// components
import ProjectList from '../../componnents/ProjectList'
import ProjectFilter from './ProjectFilter'

// styles
//import './Dashboard.css'
import {
  Box,
  Heading,
  Text,
  Spinner,
  IconButton,
} from '@chakra-ui/react';
export default function Dashboard() {
  const { user } = useAuthContext()
  const { documents, error } = useCollection('projects')
  const [filter, setFilter] = useState('all')

  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }


  const projects = documents ? documents.filter(document => {
    switch (filter) {
      case 'all':
        return true
      case 'mine':
        let assignedToMe = false
        document.assignedUsersList.forEach(u => {
          if (u.id === user.uid) {
            assignedToMe = true
          }
        })
        return assignedToMe
      case 'development':
      case 'design':
      case 'sales':
      case 'marketing':
        console.log(document.category, filter)
        return document.category === filter
      case 'history':
        

        return false

      default:
        return true
    }
  }) : null

  return (

    <Box w="100%"
      maxW="1200px"       // Use a sensible max width
      mx="auto"            // Center the box horizontally
      my="110px"           // Vertical margin
      mt={12}              // You can keep one or the other
      p={4}                // Padding (equivalent to padding="1rem")
    >
      <Heading size="md" textAlign="center" mb={6}>

        Dashboard
      </Heading>
      {error && <Text textAlign="center" >{error}</Text>}
      {documents && <ProjectFilter changeFilter={changeFilter} />}
      {projects && <ProjectList projects={projects} />}
    </Box>
  )
}