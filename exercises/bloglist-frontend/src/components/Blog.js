import './Blog.css'

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

import { incrementLikes, deleteBlog } from '../reducers/blogs'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const [isExpanded, setIsExpanded] = useState(false)

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const blogDetails = (
    <div>
      <i>by {blog.author}</i>
      <br />
      submitted by {blog.user.name}
      <br />
      <a href={blog.url} target="_blank" rel="noreferrer noopener">
        {blog.url}
      </a>
      <br />
      <span>likes {blog.likes}</span>
      <button onClick={() => dispatch(incrementLikes(blog))}>like</button>
      <br />
      <button
        className="blog-deletebutton"
        onClick={() => dispatch(deleteBlog(blog))}
      >
        delete
      </button>
      <br />
    </div>
  )

  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
      <button onClick={toggleIsExpanded}>{isExpanded ? '-' : '+'}</button>
      {isExpanded ? blogDetails : null}
    </div>
  )
}

export default Blog
