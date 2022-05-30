
import { useDispatch } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

const AnecdoteFilter = (props) => {
  const dispatch = useDispatch()

  const handleChange = (event) => {
    const newFilter = event.target.value
    dispatch(updateFilter(newFilter))
  }

  const style = {
    marginBottom: 10,
  }
  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default AnecdoteFilter