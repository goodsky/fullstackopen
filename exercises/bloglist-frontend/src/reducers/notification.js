import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    isError: false,
    timerId: null,
  },
  reducers: {
    setMessage: (state, action) => {
      const { message, isError, timerId } = action.payload
      state.message = message
      state.isError = isError
      state.timerId = timerId
    },
    clearMessage: (state) => {
      state.message = null
      state.isError = false
      state.timerId = null
    },
  },
})

const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, isError = false) => {
  return (dispatch, getState) => {
    const { timerId } = getState().notification
    if (timerId) {
      clearTimeout(timerId)
    }

    const newTimerId = setTimeout(
      () => {
        dispatch(clearMessage())
      },
      isError ? 5000 : 2000
    )

    dispatch(
      setMessage({ message: message, isError: isError, timerId: newTimerId })
    )
  }
}

export const clearNotification = () => {
  return (dispatch) => {
    dispatch(clearMessage())
  }
}

export default notificationSlice.reducer
