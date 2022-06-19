import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { logoutUser } from '../reducers/login'

const NavBar = () => {
  const dispatch = useDispatch()
  const { loggedInUser } = useSelector((state) => state.login)

  const navBarStyle = {
    backgroundColor: '#D3D3D3',
  }

  const spanStyle = {
    marginLeft: 6,
    marginRight: 6,
  }

  return (
    <div style={navBarStyle}>
      <span style={spanStyle}>
        <Link to="/">blogs</Link>
      </span>
      <span style={spanStyle}>
        <Link to="/users">users</Link>
      </span>
      <span style={spanStyle}>
        &apos;{loggedInUser.name}&apos; is logged in
        <button style={spanStyle} onClick={() => dispatch(logoutUser())}>
          Logout
        </button>
      </span>
    </div>
  )
}

export default NavBar
