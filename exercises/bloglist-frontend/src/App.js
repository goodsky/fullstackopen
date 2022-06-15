import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

import { setNotification } from './reducers/notification'

import './App.css'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const setBlogsOrdered = (blogs) => {
    blogs.sort((b1, b2) => b2.likes - b1.likes)
    setBlogs(blogs)
  }

  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const newBlogRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogsOrdered(blogs))
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const setUserAndSave = (user) => {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    setUser(user)
    blogService.setToken(user.token)
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    blogService.setToken(null)
    console.log('Logged out')
  }

  const addBlog = async (newBlog) => {
    await blogService.addBlog(newBlog)
    const blogs = await blogService.getAll()
    setBlogsOrdered(blogs)

    newBlogRef.current.toggleVisible()

    dispatch(setNotification(`${newBlog.title} added!`))
    console.log(`Added blog: ${newBlog.title}`)
  }

  const incrementLikes = async (blog) => {
    await blogService.incrementLikes(blog)
    const updatedBlog = await blogService.getBlog(blog.id)
    const updatedBlogs = blogs.map((existingBlog) =>
      existingBlog.id === updatedBlog.id ? updatedBlog : existingBlog
    )

    dispatch(setNotification(`You voted for '${updatedBlog.title}'!`))

    setBlogsOrdered(updatedBlogs)
  }

  const deleteBlog = async (blog) => {
    if (!window.confirm(`Removing ${blog.title} by ${blog.author}`)) {
      return
    }

    await blogService.deleteBlog(blog)
    const updatedBlogs = blogs.filter(
      (existingBlog) => existingBlog.id !== blog.id
    )

    dispatch(setNotification(`You deleted '${blog.title}'!`))

    setBlogsOrdered(updatedBlogs)
  }

  if (!user) {
    return (
      <div>
        <h1>Blog List</h1>
        <h2>Login with your username and password</h2>
        <Notification />
        <Login
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setUser={setUserAndSave}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List</h1>
      <Notification />
      <div>
        {user.name} is logged in
        <button onClick={() => logoutUser()}>Logout</button>
      </div>

      <h2>Add a Blog</h2>
      <Toggleable buttonLabel="add new blog" ref={newBlogRef}>
        <AddBlog addBlog={addBlog} />
      </Toggleable>

      <h2>The List</h2>
      <div className="blog-container">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            incrementLikes={() => incrementLikes(blog)}
            deleteBlog={() => deleteBlog(blog)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
