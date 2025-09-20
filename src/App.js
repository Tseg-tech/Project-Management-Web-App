import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { Box , Text, Button} from '@chakra-ui/react';

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
    
    <Box
      minH="100vh"
    >
      <Box display="flex">
        {authIsReady && (
          <BrowserRouter>
            {/* {user && <Sidebar />} */}
            <Box flex="1" px="60px">
              <Navbar />
              
              <Switch>
                <Route exact path="/">
                  {!user && <Redirect to="/welcomeboard"/>}
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
                  {!user && <Welcome/>}
                  {user && <Redirect to="/" />}
                </Route>
                <Route path="/login">
                  {user && <Redirect to="/" />}
                  {!user && <Login />}
                </Route>
                <Route path="/signup">
                  {user && <Redirect to="/" />}
                  {!user && <Signup />}
                </Route>
              
              </Switch>
            </Box>
            {user && <OnlineUsers />}
          </BrowserRouter>
        )}
      </Box>
    </Box>
  );
}

export default App