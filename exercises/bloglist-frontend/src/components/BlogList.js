import { useRef } from 'react'

import AddBlog from './AddBlog'
import Blog from './Blog'
import Toggleable from './Toggleable'

const BlogList = ({ blogs }) => {
  const newBlogRef = useRef()

  return (
    <div>
      <Toggleable buttonLabel="add new blog" ref={newBlogRef}>
        <AddBlog parentRef={newBlogRef} />
      </Toggleable>

      <div className="blog-container">
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default BlogList
