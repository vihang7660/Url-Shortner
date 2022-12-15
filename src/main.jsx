import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {StateProvider} from './reducer'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </React.StrictMode>,
)
