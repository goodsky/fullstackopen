import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { incrementLikes } from '../reducers/blogs'

const BlogDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  if (!blog) {
    return (
      <div>
        <h2>Uh oh! Blog not found.</h2>
      </div>
    )
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div>
        <a href={blog.url} target="_blank" rel="noreferrer noopener">
          {blog.url}
        </a>
      </div>
      <div>
        <span>likes {blog.likes}</span>
        <button onClick={() => dispatch(incrementLikes(blog))}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </div>
  )
}

export default BlogDetails
