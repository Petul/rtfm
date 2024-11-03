import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './App.css'
import '@picocss/pico'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="container-fluid title">
    <h1>RTFM</h1>
    </div>
        <App />
  </StrictMode>,
)
