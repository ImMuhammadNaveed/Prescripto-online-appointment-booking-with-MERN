import { AdminContextProvider } from './context/AdminContext.jsx'
import { DoctorContextProvider } from './context/DoctorContext.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <AdminContextProvider>
    <DoctorContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DoctorContextProvider>
  </AdminContextProvider>
)
