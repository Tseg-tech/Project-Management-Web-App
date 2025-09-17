import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../../componnents/Avatar"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { Box, Heading, UnorderedList, ListItem, Text, FormLabel,Textarea,Button } from "@chakra-ui/react"

export default function ProjectComments({ project }) {
  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore('projects')
  const [newComment, setNewComment] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random()
    }

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    })
    if (!response.error) {
      setNewComment('')
    }
  }

  return (
    <Box>
      <Heading color="var(--heading-color)">Project Comments</Heading >
      <UnorderedList listStyleType="none"
            m={0} p={0}>
        
        {project.comments.length > 0 && project.comments.map(comment => (
          <ListItem 
            p="16px"
            borderRadius="4px"
            border="1px solid #f2f2f2"
            mt="20px"
            boxShadow="3px 3px 5px rgba(0,0,0,0.05)"
            bg="#f59e9eff" key={comment.id}>
            <Box
              display="flex"
              alignItems="center"
              color="var(--title-color)"
            >
              <Avatar boxSize="30px"
                mr="10px" src={comment.photoURL} />
              <Text >{comment.displayName}</Text>
            </Box>
            <Box color="var(--text-color)"
              fontSize="0.9em"
              mt="4px"
              mb="10px">
              <Text>{formatDistanceToNow(comment.createdAt.toDate(), { addSuffix: true })}</Text>
            </Box>
            <Box color="var(--text-color)"
              fontSize="0.9em">
              <Text>{comment.content}</Text>
            </Box>
          </ListItem>
        ))}
      </UnorderedList>

      <Box as="form"  onSubmit={handleSubmit}>
        <FormLabel mb="0px">
          <Box as="span">Add new comment:</Box>
          <Textarea
            //minH="40px"
            fontSize="1.5em"
            bg="#f7ebebff"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          ></Textarea>
        </FormLabel>
        <Button type="submit" mt="20px">Add Comment</Button>
      </Box>
    </Box>
  )
}