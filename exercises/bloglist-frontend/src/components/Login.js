import { useDispatch, useSelector } from 'react-redux'
import { Button, Stack, TextField } from '@mui/material'

import { loginUser, setUsername, setPassword } from '../reducers/login'
import loginService from '../services/login'
import { setNotification } from '../reducers/notification'

const Login = () => {
  const dispatch = useDispatch()
  const { username, password } = useSelector((state) => state.login)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.getUser(username, password)
      dispatch(loginUser(user))
      dispatch(setUsername(''))
      dispatch(setPassword(''))
    } catch (error) {
      console.error('Failed to log in', error)
      dispatch(setPassword(''))
      dispatch(setNotification('Could not log in!', true))
    }
  }

  return (
    <Stack component="form" spacing={2} maxWidth="500px" onSubmit={handleLogin}>
      <TextField
        required
        label="Username"
        value={username}
        variant="standard"
        onChange={(event) => dispatch(setUsername(event.target.value))}
      />
      <TextField
        required
        type="password"
        label="Password"
        value={password}
        variant="standard"
        onChange={(event) => dispatch(setPassword(event.target.value))}
      />
      <Button type="submit" color="primary" variant="contained">
        Login
      </Button>
    </Stack>
  )
}

export default Login
