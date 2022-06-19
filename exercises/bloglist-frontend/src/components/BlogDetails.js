import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { incrementLikes, addComment } from '../reducers/blogs'

const BlogCommentList = ({ comments }) => {
  const commentListStyle = {
    marginTop: 16,
  }

  if (!comments || comments.length === 0) {
    return (
      <div style={commentListStyle}>
        <i>This blog has no comments!</i>
      </div>
    )
  }

  return (
    <div style={commentListStyle}>
      {comments.map((comment) => (
        <li key={comment._id}>{comment.comment}</li>
      ))}
    </div>
  )
}

const BlogDetails = () => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  const [comment, setComment] = useState('')

  if (!blog) {
    return (
      <div>
        <h2>Uh oh! Blog not found.</h2>
      </div>
    )
  }

  const handleAddComment = (e) => {
    e.preventDefault()
    dispatch(addComment(blog, comment))
    setComment('')
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
      <h2>comments</h2>
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <BlogCommentList comments={blog.comments} />
    </div>
  )
}

export default BlogDetails
