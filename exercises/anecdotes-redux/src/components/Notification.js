import { connect } from "react-redux"

const Notification = (props) => {
  const { notification } = props

  if (notification === null || notification.message === null) {
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

const ConnectedNotification = connect(
  (state) => {
    return {
      notification: state.notification
    }
  }
)(Notification)
export default ConnectedNotification