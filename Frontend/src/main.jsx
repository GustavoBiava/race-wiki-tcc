import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import ThemeProvider from './contexts/ThemeContext.jsx';
import AdminProvider from './contexts/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AdminProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </AdminProvider>
  </StrictMode>,
)
