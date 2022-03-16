import { useEffect, useRef, useState } from 'react';
import AddBlog from './components/AddBlog';
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

  const addBlog = async (newBlog) => {
    await blogService.addBlog(newBlog);
    const blogs = await blogService.getAll();
    setBlogs(blogs);

    newBlogRef.current.toggleVisible();

    setInfoMessage(`${newBlog.title} added!`);
    console.log(`Added blog: ${newBlog.title}`);
  };

  const incrementLikes = async (blog) => {
    await blogService.incrementLikes(blog);
    const updatedBlog = await blogService.getBlog(blog.id);
    console.log("Blogs", blogs);
    console.log("Updated Blog", updatedBlog);
    setBlogs(blogs.map(existingBlog => existingBlog.id === updatedBlog.id ? updatedBlog : existingBlog));
  };

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
        <AddBlog addBlog={addBlog} />
      </Toggleable>
      
      <h2>The List</h2>
      <div className="blog-container">
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} incrementLikes={() => incrementLikes(blog)} />
        )}
      </div>
    </div>
  );
}

export default App;
