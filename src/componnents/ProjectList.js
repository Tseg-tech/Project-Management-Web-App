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
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(320px, 1fr))"
      gap="20px" // Chakra's shorthand for gridGap
    >
      {projects.length === 0 && <Text>No projects yet!</Text>}

      {projects.map((project) => (
        <Link
          to={`/projects/${project.id}`}
          key={project.id}
          style={{ textDecoration: "none" }}
        >
          <Box
            // bg="#f59e9e"
            p="16px"
            borderRadius="6px"
            boxShadow="3px 3px 5px rgba(0, 0, 0, 0.05)"
            color="inherit"
            _hover={{ bg: "#f77c7c" }}
          >
            <Heading fontSize="0.9em" color="var(--heading-color)">
              {project.name}
            </Heading>

            <Text color="var(--text-color)" fontSize="0.9em">
              Due by {project.dueDate.toDate().toDateString()}
            </Text>

            <Box mt="20px" pt="10px" borderTop="1px solid #101010" borderRadius="6px">
              <Text color="var(--text-color)" fontSize="0.9em" mb="10px">
                <strong>Assigned to:</strong>
              </Text>

              <UnorderedList
                listStyleType="none"
                m={0}
                p={0}
                display="flex"
                flexWrap="wrap"
                alignItems="center"
              >
                {project.assignedUsersList.map((user) => (
                  <ListItem
                    key={user.photoURL}
                    display="flex"
                    alignItems="center"
                    mr="10px"
                    fontWeight="bold"
                    color="var(--text-color)"
                  >
                    <Text mr="10px">{user.displayName}</Text>
                    <Avatar src={user.photoURL} boxSize="30px" />
                  </ListItem>
                ))}
              </UnorderedList>
            </Box>
          </Box>
        </Link>
      ))}
    </Box>

  )
}