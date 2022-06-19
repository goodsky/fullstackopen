import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { initializeUsers } from '../reducers/users'

const UsersBlogList = ({ blogs }) => {
  if (!blogs || blogs.length === 0) {
    return (
      <p>
        <i>This user hasn&apos;t submitted any blogs yet!</i>
      </p>
    )
  }

  return (
    <>
      {blogs.map((blog) => (
        <li key={blog.id}>{blog.title}</li>
      ))}
    </>
  )
}

const UserDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )

  useEffect(() => {
    if (!user) {
      dispatch(initializeUsers())
    }
  }, [])

  if (!user) {
    return (
      <div>
        <h2>Uh oh! User not found.</h2>
      </div>
    )
  }

  return (
    <div>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <UsersBlogList blogs={user.blogs} />
    </div>
  )
}

export default UserDetails
