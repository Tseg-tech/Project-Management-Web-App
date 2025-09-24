import { useState, useEffect } from 'react'
import { Link, Link as RouterLink, useLocation, } from 'react-router-dom'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router'
import Select from 'react-select'
//import Dashboard from '../dashboard/Dashboard'
// styles
//import './Create.css'

import {
  Box,
  UnorderedList, ListItem, Flex, Text, Image,
  Img,
  Input,
  Heading,
  FormControl,
  Textarea,
  Button,
  Spacer,
  AbsoluteCenter, FormLabel
} from '@chakra-ui/react';

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  const history = useHistory()
  const { addDocument, response } = useFirestore('projects')
  const { user } = useAuthContext()
  const { documents } = useCollection('users')
  const [users, setUsers] = useState([])

  // form field values
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [formError, setFormError] = useState(null)

  // create user values for react-select
  useEffect(() => {
    if (documents) {
      setUsers(documents.map(user => {
        return { value: { ...user, id: user.id }, label: user.displayName }
      }))
    }
  }, [documents])



  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)


    if (!category) {
      setFormError('Please select a project category.')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign the project to at least 1 user')
      return
    }

    const assignedUsersList = assignedUsers.map(u => {
      return {
        displayName: u.value.displayName,
        photoURL: u.value.photoURL,
        id: u.value.id
      }
    })
    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    const project = {
      name,
      details,
      assignedUsersList,
      createdBy,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: []
    }

    await addDocument(project)
    if (!response.error) {
      history.push('/dashboard')
    }
    // history.push('/dashboard');  // Navigate programmatically
  }

  return (


    <Box
      width="100%"
      maxW="500px"
      mx="auto"
      mt={12}
      p={4}
      bg="white"
    // borderRadius="md"
    // boxShadow="md"
    >
      <Box as="form" onSubmit={handleSubmit}>
        <Heading size="md" textAlign="center" mb={6}>
          Create Task
        </Heading>

        {/* Project Name */}
        <FormControl isRequired mb={4}>
          <FormLabel>Project Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        {/* Project Details */}
        <FormControl isRequired mb={4}>
          <FormLabel>Project Details</FormLabel>
          <Textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </FormControl>

        {/* Due Date */}
        <FormControl isRequired mb={4}>
          <FormLabel>Set Due Date</FormLabel>
          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </FormControl>

        {/* Category (React Select) */}
        <FormControl isRequired mb={4}>
          <FormLabel>Project Category</FormLabel>
          <Box
            sx={{
              ".chakra-react-select__control": {
                borderColor: "#131313ff",
              },
            }}
          >
            <Select
              onChange={(option) => setCategory(option)}
              options={categories}
            />
          </Box>
        </FormControl>

        {/* Assigned Users (React Select Multi) */}
        <FormControl isRequired mb={4}>
          <FormLabel>Assign To</FormLabel>
          <Box
            sx={{
              ".chakra-react-select__control": {
                borderColor: "#131313ff",
              },
            }}
          >
            <Select
              isMulti
              onChange={(option) => setAssignedUsers(option)}
              options={users}
            />
          </Box>
        </FormControl>

        {/* Submit Button */}
        <Button
          type="submit"
          bg="#f59e9e"
          color="white"
          _hover={{ bg: "#f77c7c" }}
          width="full"
          mt={4}
        >
          Add
        </Button>

        {/* Error Message */}
        {formError && (
          <Text color="red.500" fontSize="sm" mt={2} textAlign="center">
            {formError}
          </Text>
        )}
      </Box>
    </Box>


  )
}