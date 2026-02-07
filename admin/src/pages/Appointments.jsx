import AdminAppointments from "../components/AdminAppointments"
import DoctorAppointments from "../components/DoctorAppointments"
import { useContext } from "react"
import { adminContext } from "../context/AdminContext"
import { doctorContext } from "../context/DoctorContext"

function Appointments() {
    const {isDLoggedIn} = useContext(doctorContext)
    const {isALoggedIn} = useContext(adminContext)
    
    if(isALoggedIn){
        return(<AdminAppointments/>)
    }
    else if(isDLoggedIn){
        return(<DoctorAppointments/>)
    }
}
export default Appointments