import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const { addNew, showNotification } = props

  const navigate = useNavigate()

  const [content, resetContent] = useField('text')
  const [author, resetAuthor] = useField('text')
  const [info, resetInfo] = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    showNotification(`You added "${content.value}"!`)
    navigate("/")
  }

  const handleReset = () => {
    resetContent()
    resetAuthor()
    resetInfo()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew