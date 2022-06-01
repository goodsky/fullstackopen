import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearMessage } from "../reducers/notificationReducer"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()

  useEffect(() => {
    if (notification !== null) {
      setTimeout(() => {
        console.log('Clearing notification...')
        dispatch(clearMessage())
      },
      5000)
    }
  },
  [ dispatch, notification ])

  if (notification === null) {
    return null
  }

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 20
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification