import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h2>This page does not exist!</h2>
      <div>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  )
}

export default NotFound
