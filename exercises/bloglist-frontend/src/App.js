import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import BlogDetails from './components/BlogDetails'
import BlogList from './components/BlogList'
import Login from './components/Login'
import NavBar from './components/NavBar'
import NotFound from './components/NotFound'
import Notification from './components/Notification'
import UserDetails from './components/UserDetails'
import Users from './components/Users'

import { initializeBlogs } from './reducers/blogs'
import { checkForLoggedInUser } from './reducers/login'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const { loggedInUser } = useSelector((state) => state.login)

  useEffect(() => dispatch(initializeBlogs()), [])
  useEffect(() => dispatch(checkForLoggedInUser()), [])

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
      <NavBar />
      <h1>Blog List</h1>
      <Notification />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<BlogList blogs={blogs} />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<UserDetails />} />
      </Routes>
    </div>
  )
}

export default App
