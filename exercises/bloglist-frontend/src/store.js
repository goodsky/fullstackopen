import { configureStore } from '@reduxjs/toolkit'
import blogsReducer from './reducers/blogs'
import loginReducer from './reducers/login'
import notificationReducer from './reducers/notification'
import usersReducer from './reducers/users'

export default configureStore({
  reducer: {
    blogs: blogsReducer,
    login: loginReducer,
    notification: notificationReducer,
    users: usersReducer,
  },
})
