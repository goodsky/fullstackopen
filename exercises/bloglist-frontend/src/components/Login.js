import loginService from '../services/login'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notification'

const Login = ({ username, setUsername, password, setPassword, setUser }) => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.getUser(username, password)
      console.log('Logged in as', user.username)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.error('Failed to log in', error)
      setPassword('')
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
          onChange={(event) => setUsername(event.target.value)}
        />
      </div>
      <div>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default Login
