import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import Login from './components/Login';

import './App.css';

const InfoPopUp = ({message, setMessage}) => {
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      },
      2000);
    }
  }, [message, setMessage]);

  return message ? (
    <div className="info-popup">
      {message}
    </div>
  ) : null;
};

const ErrorPopUp = ({message, setMessage}) => {
  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      },
      5000);
    }
  }, [message, setMessage]);

  return message ? (
    <div className="error-popup">
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
  }

  if (!user) {
    return (
      <div>
        <h1>Blog List</h1>
        <h2>Login with your username and password</h2>
        <ErrorPopUp message={errorMessage} setMessage={setErrorMessage} />
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
      <InfoPopUp message={infoMessage} setMessage={setInfoMessage} />
      <ErrorPopUp message={errorMessage} setMessage={setErrorMessage} />

      <div>
        {user.name} is logged in
        <button onClick={(event) => logoutUser()}>Logout</button>
      </div>

      <h2>Add a Blog</h2>
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
