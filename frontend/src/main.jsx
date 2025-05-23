import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* <HelmetProvider> */}
    <ThemeProvider>
      <App />
    </ThemeProvider>
  {/* </HelmetProvider> */}
    </BrowserRouter>
  </StrictMode>,
)


