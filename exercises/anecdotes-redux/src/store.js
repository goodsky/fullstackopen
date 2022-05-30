import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

export const createStore = () => {
  console.log('Configuring RTK store')

  return configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
  })
}