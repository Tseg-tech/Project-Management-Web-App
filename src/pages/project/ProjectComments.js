import { useState } from "react"
import { timestamp } from "../../firebase/config"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useFirestore } from "../../hooks/useFirestore"
import Avatar from "../../componnents/Avatar"
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import {
  Box,
  Heading,
  UnorderedList,
  ListItem,
  Text,
  FormLabel,
  Textarea,
  Button,
  Flex
} from "@chakra-ui/react"

export default function ProjectComments({ project }) {
  const { user } = useAuthContext()
  const { updateDocument, response } = useFirestore('projects')

  const [newComment, setNewComment] = useState('')
  const [selectedCommentId, setSelectedCommentId] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const commentToAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(), // ideally use uuid
    }

    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    })

    if (!response.error) {
      setNewComment('')
    }
  }

  const handleDeleteSelected = async () => {
    if (!selectedCommentId) return

    const updatedComments = project.comments.filter(
      (comment) => comment.id !== selectedCommentId
    )

    await updateDocument(project.id, {
      comments: updatedComments,
    })

    setSelectedCommentId(null) // clear selection
  }

  return (
    <Box>
      <Heading color="var(--heading-color)" textAlign="center">
        Q@A
      </Heading>

      {/* Comment List */}
      <UnorderedList listStyleType="none" m={0} p={0}>
        {project.comments.length > 0 &&
          project.comments.map((comment) => {
            const isSelected = selectedCommentId === comment.id

            return (
              <ListItem
                key={comment.id}
                p="16px"
                borderRadius="4px"
                border="2px solid"
                position="relative" // add this
                borderColor={isSelected ? "blue.400" : "#f2f2f2"}
                mt="20px"
                boxShadow="3px 3px 5px rgba(0,0,0,0.05)"
                bg={isSelected ? "#bee3f8" : "#f59e9eff"}
                cursor="pointer"
                onClick={() =>
                  setSelectedCommentId(
                    selectedCommentId === comment.id ? null : comment.id
                  )
                }
              >
                {/* ❌ Delete button inside selected comment */}
                {isSelected && (
                  <Button
                    size="xs"
                    position="absolute"
                    top="8px"
                    right="8px"
                    colorScheme="red"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation() // prevent selection toggle
                      handleDeleteSelected()
                    }}
                  >
                    ✕
                  </Button>
                )}

                <Box display="flex" alignItems="center" color="var(--title-color)">
                  <Avatar boxSize="30px" mr="10px" src={comment.photoURL} />
                  <Text>{comment.displayName}</Text>
                </Box>

                <Box color="var(--text-color)" fontSize="0.9em" mt="4px" mb="10px">
                  <Text>
                    {formatDistanceToNow(comment.createdAt.toDate(), {
                      addSuffix: true,
                    })}
                  </Text>
                </Box>

                <Box color="var(--text-color)" fontSize="0.9em">
                  <Text>{comment.content}</Text>
                </Box>
              </ListItem>
            )
          })}
      </UnorderedList>

      {/* Comment Form */}
      <Box as="form" onSubmit={handleSubmit} mt="30px">
        <FormLabel mb="0px">
          <Box as="span">Add new comment:</Box>
          <Textarea
            fontSize="1.5em"
            bg="#ffffffff"
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}
          />
        </FormLabel>

        <Flex mt="20px" gap="10px">
          <Button type="submit" bg="#f59e9eff">
            Submit
          </Button>
          <Button
            type="button"
            bg="red.300"
            onClick={() => setNewComment("")}
          >
            Cancel
          </Button>
        </Flex>
      </Box>
    </Box>
  )
}
