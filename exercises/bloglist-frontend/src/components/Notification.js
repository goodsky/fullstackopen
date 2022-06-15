import { useSelector } from 'react-redux'

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

  return message ? (
    <div className={isError ? 'error-popup' : 'info-popup'}>{message}</div>
  ) : null
}

export default Notification
