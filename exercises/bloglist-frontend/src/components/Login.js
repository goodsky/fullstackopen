import login from '../services/login';

const Login = ({
  username,
  setUsername,
  password,
  setPassword,
  setUser,
  setErrorMessage,
}) => {
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login.getUser(username, password);
      console.log('Logged in as', user.username);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Failed to log in', error);
      setPassword('');
      setErrorMessage('Could not log in!');
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        Username:
        <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
      </div>
      <div>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login
