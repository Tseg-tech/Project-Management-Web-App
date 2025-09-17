import { Link } from 'react-router-dom'
import Avatar from '../componnents/Avatar'
import { useAuthContext } from '../hooks/useAuthContext'
// styles
//import './ProjectList.css'
import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react'

export default function ProjectList({ projects }) {
  console.log(projects)
  const { user } = useAuthContext()

  return (
    <Box
      mt="40px"
      display="flex"
      gridTemplateColumns="repeat(auto-fit, minmax(320px, 1fr))"
      gridGap="20px"
    // bg="#eda7a7ff"
    >
      {projects.length === 0 && <p>No projects yet!</p>}
      {projects.map(project => (
        <Link to={`/projects/${project.id}`} key={project.id}
          // bg="#fff"
          bg="#f59e9eff"
          p="16px"
          borderRadius="6px"
          boxShadow="3px 3px 5px rgba(0, 0, 0, 0.05)"
          textDecoration="none"
          color="inherit"
        >
          <Heading  fontSize="0.9em" color="var(--heading-color)">{project.name}</Heading>
          <Text  color="var(--text-color)" fontSize="0.9em" >
            Due by {project.dueDate.toDate().toDateString()}
          </Text >
          <Box
            mt="20px"
            pt="10px"
            borderTop="1px solid #101010ff"
            //bg="#f59e9eff"
            borderRadius="6px"
          //alignItems = "center"
          >
            <Text color="var(--text-color)" fontSize="0.9em"><Text as="strong" fontWeight="bold">Assigned to:</Text ></Text >
            <UnorderedList
              listStyleType="none"
              m={0}
              p={0}
              my="10px"         // margin-top and margin-bottom 10px
              display="flex"
              alignItems="center"  // vertically center the entire list items (optional)

            >
              {project.assignedUsersList.map(user => (
                <ListItem key={user.photoURL}
                  fontWeight="bold"
                  display="flex"          // make each list item a flex container
                  alignItems="center"     // vertically center avatar and text inside
                  mr="10px" 
                  color="var(--text-color)"
                  //ml="10px" 
                 // mb="8px"             // optional spacing between list items
                >
                  <Text mr ="10px">{user.displayName}</Text>
                  <Avatar src={user.photoURL} boxSize="30px" mr="8px" />

                </ListItem>
              ))}
            </UnorderedList>
          </Box>
        </Link>
      ))
      }
    </Box >
  )
}