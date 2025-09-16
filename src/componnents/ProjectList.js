import { Link } from 'react-router-dom'
import Avatar from '../componnents/Avatar'

// styles
//import './ProjectList.css'
import { Box, Heading, Text,UnorderedList, ListItem } from '@chakra-ui/react'

export default function ProjectList({ projects }) {
  console.log(projects)

  return (
    <Box
      mt="40px"
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(320px, 1fr))"
      gridGap="20px"
    >
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}
          bg="#fff"
          p="16px"
          borderRadius="6px"
          boxShadow="3px 3px 5px rgba(0, 0, 0, 0.05)"
          textDecoration="none"
          color="inherit"
        >
          <Heading fontSize="0.9em" color="var(--heading-color)">{project.name}</Heading>
          <Text color="var(--text-color)" fontSize="0.9em" >Due by {project.dueDate.toDate().toDateString()}</Text >
          <Box
            mt="20px"
            pt="10px"
            borderTop="1px solid #eee"
          >
            <Text color="var(--text-color)" fontSize="0.9em"><strong>Assigned to:</strong></Text >
            <UnorderedList 
            my="10px"       // margin-top and margin-bottom 10px
            display="flex"
            >
              {project.assignedUsersList.map(user => (
                <ListItem key={user.photoURL} mr="10px">
                  <Avatar src={user.photoURL} w="30px" h="30px" />
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Link>
      ))}
    </Box>
  )
}