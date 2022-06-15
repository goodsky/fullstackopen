import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notification'

export default configureStore({
  reducer: {
    notification: notificationReducer,
  },
})
