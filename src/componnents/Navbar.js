import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images  <img src={Temple} alt="dojo logo" />
import './Navbar.css'
//import Temple from '../assets/temple.svg'
import { SiAnalogue } from "react-icons/si"

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <nav className="navbar">
      <ul>
        {!user && (
          <>
            <li className="logo">
              <h3><SiAnalogue color = "red" /> </h3>
              <span> Manage Your Project</span>
            </li>

            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}

       {user && (
          <li>
            {!isPending && <button className="btn" onClick={logout}>Logout</button>}
            {isPending && <button className="btn" disabled>Logging out...</button>}
          </li>
        )}
      </ul>
    </nav>
  )
}
