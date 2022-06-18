import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AddBlog from './components/AddBlog'
import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import Toggleable from './components/Toggleable'

import { initializeBlogs } from './reducers/blogs'
import { checkForLoggedInUser, logoutUser } from './reducers/login'
import './App.css'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const { loggedInUser } = useSelector((state) => state.login)

  useEffect(() => dispatch(initializeBlogs()), [])
  useEffect(() => dispatch(checkForLoggedInUser()), [])

  const newBlogRef = useRef()

  if (!loggedInUser) {
    return (
      <div>
        <h1>Blog List</h1>
        <h2>Login with your username and password</h2>
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <h1>Blog List</h1>
      <Notification />
      <div>
        &apos;{loggedInUser.name}&apos; is logged in
        <button onClick={() => dispatch(logoutUser())}>Logout</button>
      </div>

      <h2>Add a Blog</h2>
      <Toggleable buttonLabel="add new blog" ref={newBlogRef}>
        <AddBlog parentRef={newBlogRef} />
      </Toggleable>

      <h2>The List</h2>
      <div className="blog-container">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default App
