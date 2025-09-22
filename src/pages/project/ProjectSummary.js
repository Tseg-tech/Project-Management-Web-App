import Avatar from "../../componnents/Avatar"
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"
import { Box, Button, Heading, Text, AbsoluteCenter } from "@chakra-ui/react"

export default function ProjectSummary({ project }) {
  const { deleteDocument } = useFirestore('projects')
  const { user } = useAuthContext()
  const history = useHistory()

  const handleClick = () => {
    deleteDocument(project.id)
    history.push('/')
  }

  return (
    <Box >
      <Box
        bg="#f59e9eff"
        p="30px"
        borderRadius="4px"
        mt="40px"
      >
        <Heading >{project.name}</Heading>
        <Text
          my="10px"
          fontSize="0.9em"
          color="var(--title-color)"
        >
          Project due by {project.dueDate.toDate().toDateString()}
        </Text>
        <Text
          my="30px"
          color="var(--text-color)"
          lineHeight="1.8em"
          fontSize="0.9em">
          {project.details}
        </Text>
        <Heading
          color="var(--text-color)"
          fontSize="0.9em">
          Project assigned to:
        </Heading>
        <Box display="flex" mt="20px">
          {project.assignedUsersList.map(user => (
            <Box key={user.id}>
              <Avatar mr="10px" src={user.photoURL} />
            </Box>
          ))}
        </Box>
      </Box>

      {user.uid === project.createdBy.id && (
        <Button mt="20px" onClick={handleClick}>Mark as Complete</Button>
      )}

    </Box>
  )
}