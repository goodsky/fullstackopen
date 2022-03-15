import { useEffect, useRef, useState } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/Login';
import Toggleable from './components/Toggleable';

import './App.css';

const NotificationPopUp = ({message, setMessage, isError}) => {
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      },
      isError ? 5000 : 2000);
    }
  }, [message, setMessage, isError]);

  return message ? (
    <div className={isError ? "error-popup" : "info-popup"}>
      {message}
    </div>
  ) : null;
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [infoMessage, setInfoMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('');
  const [newBlogUrl, setNewBlogUrl] = useState('');

  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const newBlogRef = useRef();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const setUserAndSave = (user) => {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user));
    setUser(user);
    blogService.setToken(user.token);
  };

  const logoutUser = () => {
    window.localStorage.removeItem('loggedInUser');
    setUser(null);
    blogService.setToken(null);
    console.log('Logged out');
  };

  const handleAddBlog = async (event) => {
    event.preventDefault();

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    };

    await blogService.addBlog(newBlog);
    const blogs = await blogService.getAll();

    setInfoMessage(`${newBlog.title} added!`);

    setBlogs(blogs);
    setNewBlogTitle('');
    setNewBlogAuthor('');
    setNewBlogUrl('');
    newBlogRef.current.toggleVisible();
  }

  if (!user) {
    return (
      <div>
        <h1>Blog List</h1>
        <h2>Login with your username and password</h2>
        <NotificationPopUp message={errorMessage} setMessage={setErrorMessage} isError={true} />
        <Login
          username={username} setUsername={setUsername}
          password={password} setPassword={setPassword}
          setUser={setUserAndSave}
          setErrorMessage={setErrorMessage} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List</h1>
      <NotificationPopUp message={infoMessage} setMessage={setInfoMessage} isError={false}/>
      <NotificationPopUp message={errorMessage} setMessage={setErrorMessage} isError={true} />

      <div>
        {user.name} is logged in
        <button onClick={(event) => logoutUser()}>Logout</button>
      </div>

      <h2>Add a Blog</h2>
      <Toggleable buttonLabel="add new blog" ref={newBlogRef}>
        <form onSubmit={handleAddBlog}>
          <div>
            title:
            <input type="text" value={newBlogTitle} onChange={(event) => setNewBlogTitle(event.target.value)} />
          </div>
          <div>
            author:
            <input type="text" value={newBlogAuthor} onChange={(event) => setNewBlogAuthor(event.target.value)} />
          </div>
          <div>
            url:
            <input type="text" value={newBlogUrl} onChange={(event) => setNewBlogUrl(event.target.value)} />
          </div>
          <button type="submit">Add</button>
        </form>
      </Toggleable>
      
      <h2>The List</h2>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  );
}

export default App;
