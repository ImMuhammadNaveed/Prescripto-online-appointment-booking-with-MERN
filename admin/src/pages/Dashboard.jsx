import { useContext } from "react"
import { doctorContext } from "../context/DoctorContext"
import DoctorDashboard from "../components/DoctorDashboard"
import AdminDashboard from "../components/AdminDashboard"
import { adminContext } from "../context/AdminContext"

function Dashboard() {
    const { isDLoggedIn } = useContext(doctorContext)
    const { isALoggedIn } = useContext(adminContext)



    {
        if (isDLoggedIn) {
            return (<DoctorDashboard />)
        }
        if (isALoggedIn) {
            return (<AdminDashboard />)
        }
    }

}
export default Dashboard