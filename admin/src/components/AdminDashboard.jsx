import { useState, useEffect, useContext } from "react"
import { assets } from "../assets/assets"
import axios from "axios"
import { adminContext } from "../context/AdminContext"
import Loading from '../components/Loading'

function AdminDashboard() {
    const [dashboardData, setDashboardData] = useState()
    const { backend_url } = useContext(adminContext)
    const [loadingDashboard, setLoadingDashboard] = useState(false)
    const [loadingCancelApp, setLoadingCancelApp] = useState(false)
    const [loadingCompleteApp, setLoadingCompleteApp] = useState(false)

    async function getDashboard() {
        try {
            setLoadingDashboard(true)
            const { data } = await axios.get(backend_url + "/api/admin/dashboard", { withCredentials: true })
            if (data.success) {
                setDashboardData(data.data)
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoadingDashboard(false)
        }
    }
    useEffect(() => { getDashboard() }, [])

    async function handleCancelAppointment(id) {
        try {
            setLoadingCancelApp(true)
            const { data } = await axios.post(backend_url + "/api/admin/cancel-appointment", { appointmentId: id }, { withCredentials: true })
            alert(data.message)
            if (data.success) {
                getDashboard()
            }
        } catch (error) {
            // alert(error.response.data.message)
            console.log(error)
        }finally{
            setLoadingCancelApp(false)
        }
    }
    async function handleCompleteAppointment(id) {
        try {
            setLoadingCompleteApp(true)
            const { data } = await axios.post(backend_url + "/api/admin/complete-appointment", { appointmentId: id }, { withCredentials: true })
            console.log(data)
            alert(data.message)
            if (data.success) {
                getDashboard()
            }
        } catch (error) {
            alert(error.response.data.message)
        }finally{
            setLoadingCompleteApp(false)
        }
    }

    function appointmentStatus(appointment) {
        if (appointment.cancelAppointment) {
            return (<p className="text-red-500">Cancelled</p>)
        }
        if (appointment.isCompleted) {
            return (<p className="text-green-500">Completed</p>)
        }
        return (
            <>
                <button onClick={() => handleCompleteAppointment(appointment._id)}><img src={assets.tick_icon} alt="" className="cursor-pointer w-10" /></button>
                <button onClick={() => handleCancelAppointment(appointment._id)}><img src={assets.cancel_icon} alt="" className="cursor-pointer w-10" /></button>
            </>
        )
    }
    if(loadingDashboard){
        return(
            <Loading actionName={"Dashboard Data Loading..."}/>
        )
    }
    return dashboardData && (
        <>
        {loadingCancelApp?<Loading actionName={"Appointment Canceling..."}/>:""}
        {loadingCompleteApp?<Loading actionName={"Appointment Completing..."}/>:""}
            <div className="flex-col w-[65%]">
                <div className="flex justify-between gap-5">
                    <div className="flex items-center justify-center border border-gray-200 py-3 px-10 rounded-xl">
                        <img src={assets.doctor_icon} alt="" />
                        <div>
                            <p>{dashboardData.numberOfDoctors}</p>
                            <p>Doctors</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center border border-gray-200 py-3 px-10 rounded-xl">
                        <img src={assets.appointments_icon} alt="" />
                        <div>
                            <p>{dashboardData.numberOfAppointments}</p>
                            <p>Appointments</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-center border border-gray-200 py-3 px-10 rounded-xl">
                        <img src={assets.patients_icon} alt="" />
                        <div>
                            <p>{dashboardData.numberOfUsers}</p>
                            <p>Patients</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="flex items-center font-semibold text-lg my-7 mx-2"><img src={assets.list_icon} className="mr-1" alt="" />Latest Bookings</p>
                    {
                        dashboardData.appointments.map((appointment, index) =>
                            <div key={index} className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <img className="w-20 rounded-full" src={appointment.userData.image} alt="" />
                                    <div className="ml-2">
                                        <p className="font-semibold text-lg">{appointment.userData.name}</p>
                                        <p className="text-gray-600 text-sm">Booking on {appointment.slotDate}</p>
                                    </div>
                                </div>
                                <p>{appointmentStatus(appointment)}</p>

                            </div>)
                    }
                </div>
            </div>
        </>
    )
}
export default AdminDashboard