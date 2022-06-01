import { useSelector, useDispatch } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";

const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()

  const vote = (id, text) => {
    console.log('vote', id)
    dispatch(incrementVote(id))
  }

  const anecdotesToShow = anecdotes.filter(anecdote => {
    const content = anecdote.content.toUpperCase()
    return content.includes(filter.toUpperCase())
  })

  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList