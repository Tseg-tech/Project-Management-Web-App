import Avatar from "../../componnents/Avatar"
import { useFirestore } from "../../hooks/useFirestore"
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../../hooks/useAuthContext"
import { Box, Button, Heading, Text,  } from "@chakra-ui/react"

export default function ProjectSummary({ project }) {
  const { deleteDocument} = useFirestore('projects')
  const { user } = useAuthContext()
  const history = useHistory()
    const { updateDocument, response } = useFirestore('projects')
  // const handleClick = () => {
  //   deleteDocument(project.id)
    
  //   history.push('/dashboard')
  // }
  const handleClick = async () => {
  try {
    await updateDocument(project.id, {
      status: "completed",
      completedAt: new Date()
    });
    
    history.push('/dashboard');
  } catch (err) {
    console.error("Failed to mark project as complete:", err);
  }
};
  

  return (
    <Box>
  <Box
    bg="#f77c7c"
    p={6}
    borderRadius="md"
    mt={10}
  >
    {/* Project Title */}
    <Heading size="lg" mb={2}>
      {project.name}
    </Heading>

    {/* Due Date */}
    <Text fontSize="sm" color="gray.600" mb={6}>
      Project due by {project.dueDate.toDate().toDateString()}
    </Text>

    {/* Project Details */}
    <Text fontSize="md" color="gray.700" mb={6} lineHeight="1.8">
      {project.details}
    </Text>

    {/* Assigned Users */}
    <Heading as="h3" size="sm" color="gray.700" mb={2}>
      Project assigned to:
    </Heading>
    <Box display="flex" gap={4} mt={2} flexWrap="wrap">
      {project.assignedUsersList.map((user) => (
        <Avatar key={user.id} src={user.photoURL} name={user.displayName} />
      ))}
    </Box>
  </Box>

  {/* Action Button for Project Creator */}
  {user.uid === project.createdBy.id && (
    <Button
      mt={6}
      colorScheme="green"
      onClick={handleClick}
    >
      Mark as Complete
    </Button>
  )}
</Box>

  )
}