import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'

// styles
//import './Project.css'
import { Flex, Grid } from '@chakra-ui/react';
//components
import ProjectSummary from "./ProjectSummary"
import ProjectComments from "./ProjectComments"
//import { Box } from "@chakra-ui/react"

export default function Project() {
  const { id } = useParams()
  const { document, error } = useDocument('projects', id)

  if (error) {
    return <div className="error">{error}</div>
  }
  if (!document) {
    return <div className="loading">Loading...</div>
  }

  return (

    <Grid
      templateColumns={{ base: "1fr", md: "2fr 1fr" }}
      alignItems="start"
      gap={8}
      w="100%"
    >
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </Grid>
    
  )
}