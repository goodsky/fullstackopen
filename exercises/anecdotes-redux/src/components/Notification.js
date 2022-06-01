import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null || notification.mesasge === null) {
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
      {notification.message}
    </div>
  )
}

export default Notification