import './Blog.css'

import { useState } from 'react'

const Blog = ({ blog, incrementLikes, deleteBlog }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleIsExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const blogDetails = (
    <div>
      <i>by {blog.author}</i>
      <br />
      submitted by {blog.user.username}
      <br />
      <a href={blog.url} target="_blank" rel="noreferrer noopener">
        {blog.url}
      </a>
      <br />
      <span>likes {blog.likes}</span>
      <button onClick={incrementLikes}>like</button>
      <br />
      <button className="blog-deletebutton" onClick={deleteBlog}>
        delete
      </button>
      <br />
    </div>
  )

  return (
    <div className="blog">
      <u>{blog.title}</u>{' '}
      <button onClick={toggleIsExpanded}>{isExpanded ? 'hide' : 'show'}</button>
      {isExpanded ? blogDetails : null}
    </div>
  )
}

export default Blog
