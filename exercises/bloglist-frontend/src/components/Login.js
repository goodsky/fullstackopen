import loginService from '../services/login'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, setUsername, setPassword } from '../reducers/login'
import { setNotification } from '../reducers/notification'

const Login = () => {
  const dispatch = useDispatch()
  const { username, password } = useSelector((state) => state.login)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.getUser(username, password)
      console.log('Logged in as', user.username)
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
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input
          type="text"
          value={username}
          onChange={(event) => dispatch(setUsername(event.target.value))}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => dispatch(setPassword(event.target.value))}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
