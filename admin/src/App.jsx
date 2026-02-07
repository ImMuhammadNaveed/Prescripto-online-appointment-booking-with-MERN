import './App.css'
import Login from './pages/Login'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from "./components/Navbar"
import Sidebar from "./pages/Sidebar"
import AddDoctor from './pages/AddDoctor'
import Appointments from './pages/Appointments'
import DoctorsList from './pages/DoctorsList'
import Profile from './pages/Profile'
import Dashboard from './pages/Dashboard'
import { adminContext } from './context/AdminContext'
import { doctorContext } from './context/DoctorContext'
import { useContext } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function App() {
  const { isALoggedIn, aLoading } = useContext(adminContext)
  const { isDLoggedIn, dLoading } = useContext(doctorContext)
  const location = useLocation()

  if (aLoading || dLoading) {
    return <p>Auth loading...</p>
  }

  return (
    <>
      {
        !isALoggedIn && !isDLoggedIn
          ? <Login />
          : <>
              <Navbar />
              <div className="flex">
                <Sidebar />

                {/* Animated Page Area */}
                <div className="flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={location.pathname}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <Routes location={location}>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/appointments" element={<Appointments />} />
                        <Route path="/add-new-doctor" element={<AddDoctor />} />
                        <Route path="/doctors-list" element={<DoctorsList />} />
                        <Route path="/profile" element={<Profile />} />
                      </Routes>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </>
      }
    </>
  )
}

export default App
