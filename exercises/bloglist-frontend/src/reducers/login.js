import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

import { setNotification } from './notification'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loggedInUser: null,
    username: '',
    password: '',
  },
  reducers: {
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload
    },
    setUsername: (state, action) => {
      state.username = action.payload
    },
    setPassword: (state, action) => {
      // this seems a smidge too far, doesn't it?
      state.password = action.payload
    },
  },
})

const { setLoggedInUser } = loginSlice.actions
export const { setUsername, setPassword } = loginSlice.actions

export const checkForLoggedInUser = () => {
  return async (dispatch) => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      dispatch(setLoggedInUser(user))
      blogService.setToken(user.token)
      console.log(`Found cached user ${user.username}`)
    }
  }
}

export const loginUser = (user) => {
  return async (dispatch) => {
    window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    dispatch(setLoggedInUser(user))
    blogService.setToken(user.token)

    dispatch(setNotification(`You have logged in as '${user.username}'`))
    console.log(`Logged in as ${user.username}`)
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(setLoggedInUser(null))
    blogService.setToken(null)

    dispatch(setNotification('You have logged out'))
    console.log('Logged out')
  }
}

export default loginSlice.reducer
