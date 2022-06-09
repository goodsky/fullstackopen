import { connect } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const createNew = async (formEvent) => {
    formEvent.preventDefault()
    const text = formEvent.target.anecdoteText.value
    formEvent.target.anecdoteText.value = ''
    
    console.log('new anecdote', text)
    props.addAnecdote(text)
  }

  return (
  <div>
    <h2>create new</h2>
    <form onSubmit={createNew}>
      <div><input name="anecdoteText"/></div>
      <button type="submit">create</button>
    </form>
  </div>
  )
}

export default connect(
  null,
  { addAnecdote }
)(AnecdoteForm)