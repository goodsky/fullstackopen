
import { connect } from "react-redux"
import { updateFilter } from "../reducers/filterReducer"

const AnecdoteFilter = (props) => {
  const handleChange = (event) => {
    const newFilter = event.target.value
    props.updateFilter(newFilter)
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

export default connect(
  null,
  { updateFilter }
)(AnecdoteFilter)
