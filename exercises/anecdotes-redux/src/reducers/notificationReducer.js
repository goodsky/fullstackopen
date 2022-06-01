import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      return action.payload
    },
    clearMessage(state, action) {
      return null
    }
  }
})

export const { setMessage, clearMessage } = notificationSlice.actions

export const setNotification = (message, secondsToDisplay) => {
  const myId = Math.floor(Math.random() * 1000000)
  return async (dispatch, getState) => {
    console.log('displaying notification', myId)
    dispatch(setMessage({ message, id: myId }))
    setTimeout(() => {
      const { id } = getState().notification
      
      // only clear the message if its the one we put up
      if (id === myId) {
        console.log('clearing notification', myId)
        dispatch(clearMessage())
      }
      else {
        console.log('not clearning notification', myId, '. Current id', id)
      }
    }, secondsToDisplay * 1000)
  }
}

export default notificationSlice.reducer