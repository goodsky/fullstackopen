import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogs'

const AddBlog = ({ parentRef }) => {
  const dispatch = useDispatch()

  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

  const handleAddBlog = (event) => {
    event.preventDefault()

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl,
    }

    dispatch(addBlog(newBlog))

    parentRef.current.toggleVisible()
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogUrl('')
  }

  return (
    <form onSubmit={handleAddBlog}>
      <div>
        title:
        <input
          type="text"
          id="add-blog-title"
          value={newBlogTitle}
          onChange={(event) => setNewBlogTitle(event.target.value)}
        />
      </div>
      <div>
        author:
        <input
          type="text"
          id="add-blog-author"
          value={newBlogAuthor}
          onChange={(event) => setNewBlogAuthor(event.target.value)}
        />
      </div>
      <div>
        url:
        <input
          type="text"
          id="add-blog-url"
          value={newBlogUrl}
          onChange={(event) => setNewBlogUrl(event.target.value)}
        />
      </div>
      <button type="submit">Add</button>
    </form>
  )
}

export default AddBlog
