import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { timerId: null },
  reducers: {
    setMessage(state, action) {
      state.message = action.payload
    },
    clearMessage(state, action) {
      state.message = null
      state.timerId = null
    },
    setTimerId(state, action) {
      state.timerId = action.payload
    }
  }
})

const { setMessage, clearMessage, setTimerId } = notificationSlice.actions

export const setNotification = (message, secondsToDisplay) => {
  return async (dispatch, getState) => {
    const oldTimerId = getState().notification.timerId
    if (oldTimerId !== null) {
      console.log('Clearing timeout', oldTimerId)
      clearTimeout(oldTimerId)
    }
    
    dispatch(setMessage(message))
    const newTimerId = setTimeout(() => dispatch(clearMessage()), secondsToDisplay * 1000)
    dispatch(setTimerId(newTimerId))
  }
}

export default notificationSlice.reducer