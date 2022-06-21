import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import { BrowserRouter } from 'react-router-dom'
import { Container } from '@mui/material'
import { Provider } from 'react-redux'

ReactDOM.render(
  <Provider store={store}>
    <Container>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Container>
  </Provider>,
  document.getElementById('root')
)
