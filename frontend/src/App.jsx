import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AllDoctors from './pages/AllDoctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import MyProfile from './pages/MyProfile'
import Appointment from './pages/Appointment'
import MyAppointments from './pages/MyAppointments'
import Footer from './components/Footer'
import { UserContextProvider } from './context/Context'
import { AnimatePresence, motion } from 'framer-motion'

function App() {

  const location = useLocation()

  return (
    <>
      <UserContextProvider>
        <Navbar />
        <AnimatePresence mode='wait'>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Routes location={location}>
              <Route path='/' element={<Home />} />
              <Route path='/doctors' element={<AllDoctors />} />
              <Route path='/doctors/:speciality' element={<AllDoctors />} />
              <Route path='/login' element={<Login />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/my-profile' element={<MyProfile />} />
              <Route path='/appointment/:docId' element={<Appointment />} />
              <Route path='/appointment' element={<Appointment />} />
              <Route path='/my-appointments' element={<MyAppointments />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
        <Footer />
      </UserContextProvider>
    </>
  )
}

export default App
