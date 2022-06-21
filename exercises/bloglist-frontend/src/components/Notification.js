import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const { message, isError } = useSelector((state) => state.notification)

  return message ? (
    <Alert sx={{ mb: 3 }} severity={isError ? 'error' : 'success'}>
      {message}
    </Alert>
  ) : null
}

export default Notification
