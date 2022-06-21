import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'

import { logoutUser } from '../reducers/login'

const NavBar = () => {
  const dispatch = useDispatch()
  const { loggedInUser } = useSelector((state) => state.login)

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>
        <Box sx={{ flexGrow: 1 }}>
          <Button color="inherit" component={Link} to="/">
            blogs
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
        </Box>
        <Typography color="inherit">Hello {loggedInUser.name}!</Typography>
        <Button color="inherit" onClick={() => dispatch(logoutUser())}>
          log out
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar
