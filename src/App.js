import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { Box, Text, Button, Flex} from '@chakra-ui/react';

// styles
import './App.css'

// pages & components
import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Project from './pages/project/Project'
import Navbar from './componnents/Navbar'
// import Sidebar from './componnents/Sidebar'
import OnlineUsers from './componnents/OnlineUsers'
import Welcome from './pages/welcomeboard/me'

function App() {
  const { authIsReady, user } = useAuthContext()

  return (

    <Box minH="100vh" display="flex" flexDirection="column">
      {authIsReady && (
        <BrowserRouter>
          {/* Navbar + Content in flex box */}
          <Flex flex="1" px={{ base: 4, md: 12 }} flexDirection="column">
            <Navbar />
            <Box flex="1" mt={4}>

              <Switch>
                <Route exact path="/">
                  {!user && <Redirect to="/welcomeboard" />}
                  {user && <Welcome />}
                </Route>
                <Route path="/dashboard">
                  {!user && <Redirect to="/welcomeboard" />}
                  {user && <Dashboard />}
                </Route>
                <Route path="/create">
                  {!user && <Redirect to="/welcomeboard" />}
                  {user && <Create />}
                </Route>
                <Route path="/projects/:id">
                  {!user && <Redirect to="/welcomeboard" />}
                  {user && <Project />}
                </Route>
                <Route path="/welcomeboard">
                  {!user && <Welcome />}
                  {user && <Redirect to="/" />}
                </Route>
                <Route path="/login">
                  {user && <Redirect to="/dashboard" />}
                  {!user && <Login />}
                </Route>
                <Route path="/signup">
                  {user && <Redirect to="/dashboard"/>}
                  {!user && <Signup />}
                </Route>

              </Switch>
            </Box>
          </Flex>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </Box>
  );
}

export default App