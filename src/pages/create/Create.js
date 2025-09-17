import { useState, useEffect } from 'react'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import { useFirestore } from '../../hooks/useFirestore'
import { useHistory } from 'react-router'
import Select from 'react-select'

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
      history.push('/')
    }
  }

  return (
    <Box maxW="600px" my="110px"  >
      <Heading
        fontFamily="inherit"
        fontWeight="bold"
        fontSize="1.2em"
        my="20px" 
        mx="auto"
        
       // alignItems="center"
      >New Project</Heading>
      <Box bg="#f59e9eff"  borderRadius="8px" mt="10px" mx="auto">
      <Box as="form" onSubmit={handleSubmit}
       maxW="500px" 
       borderRadius="4px"
       mx="auto"
       
      >
        <FormControl
          borderColor="#131313ff"
          borderRadius="md"
        >
          <Text as="span">Project name:</Text>
          <Input
            isRequired
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </FormControl  >
        <Spacer my="20px" mx="auto" />
        <FormControl
          borderColor="#131313ff"
          borderRadius="md"
        >
          <Text as="span">Project Details:</Text>
          <Textarea 
            isRequired
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          ></Textarea>
        </FormControl>
        <Spacer my="20px" mx="auto" />
        <FormControl
          borderColor="#131313ff"
          borderRadius="md"
        >
          <Text as="span">Set due date:</Text>
          <Input
            isRequired
            type="date"
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </FormControl>
        <Spacer my="20px" mx="auto" />
        
        <FormControl
          borderColor="#131313ff"
          borderRadius="md"
        >
          <Text as="span" >Project category:</Text>
          <Select 
            styles={{ control: (styles) => ({ ...styles, borderColor: '#131313ff' }) }}
            onChange={(option) => setCategory(option)}
            options={categories}
          />
        </FormControl>
        
        <Spacer my="20px" mx="auto" />

        <FormControl
          borderColor="#131313ff"
          borderRadius="md"
        >
          <Text as="span">Assign to:</Text>
          <Select 
            styles={{ control: (styles) => ({ ...styles, borderColor: '#131313ff' }) }}
            onChange={(option) => setAssignedUsers(option)}
            options={users}
            isMulti
          />
        </FormControl>

        <Spacer my="10px" mx="auto" />

        <Button colorScheme="teal" size="md" variant="solid" my="10px" mx="auto">
          Add Project
        </Button>
        
        {formError && <Text className="error">{formError}</Text>}
        
      </Box>
      </Box>
    </Box>
  )
}