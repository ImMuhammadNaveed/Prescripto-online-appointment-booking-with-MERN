import axios from "axios"
import { assets } from "../assets/assets"
import { adminContext } from "../context/AdminContext"
import { doctorContext } from "../context/DoctorContext"
import { useContext, useEffect, useState } from "react"
import Loading from '../components/Loading'

function DoctorDashboard() {
    const [dashboardData, setDashboardData] = useState()
    const { backend_url } = useContext(adminContext)
    const { isDLoggedIn, setIsDLoggedIn } = useContext(doctorContext)
    const [loading, setLoading] = useState(false)
    const [loadingCancelApp, setLoadingCancelApp] = useState(false)
    const [loadingCompleteApp, setLoadingCompleteApp] = useState(false)

    async function getDashboard() {
        try {
            setLoading(true)
            const { data } = await axios.get(backend_url + "/api/doctor/dashboard", { withCredentials: true })
            if (data.success) {
                setDashboardData(data.data)
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error.response.data.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => { getDashboard() }, [])

    async function handleCancelAppointment(id) {
        try {
            setLoadingCancelApp(true)
            const { data } = await axios.post(backend_url + "/api/doctor/cancel-appointment", { appointmentId: id }, { withCredentials: true })
            alert(data.message)
            if (data.success) {
                getDashboard()
            }
        } catch (error) {
            alert(error.response.data.message)
        }finally{
            setLoadingCancelApp(false)
        }
    }
    async function handleCompleteAppointment(id) {
        try {
            setLoadingCompleteApp(true)
            const { data } = await axios.post(backend_url + "/api/doctor/complete-appointment", { appointmentId: id }, { withCredentials: true })
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
            return (<p className="text-sm text-red-500">Cancelled</p>)
        }
        if (appointment.isCompleted) {
            return (<p className="text-sm text-green-500">Completed</p>)
        }
        return (
            <div>
                <button onClick={() => handleCompleteAppointment(appointment._id)}><img src={assets.tick_icon} alt="" className="w-10" /></button>
                <button onClick={() => handleCancelAppointment(appointment._id)}><img src={assets.cancel_icon} alt="" className="w-10" /></button>
            </div>
        )
    }
    if(loading){
        return(
            <Loading actionName={"Loading dashboard data..."}/>
        )
    }
    return dashboardData && (
        <>
        {loadingCancelApp?<Loading actionName={"Appointment Canceling..."}/>:""}
        {loadingCompleteApp?<Loading actionName={"Appointment Completing..."}/>:""}
            <div className="flex-col w-[65%]">
                <div className="flex justify-between gap-5">
                    <div className="flex items-center justify-center border border-gray-200 py-3 px-10 rounded-xl">
                        <img src={assets.earning_icon} alt="" />
                        <div>
                            <p>{dashboardData.earnings}</p>
                            <p>Earnings</p>
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
                            <p>{dashboardData.numberOfPatients}</p>
                            <p>Patients</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="flex items-center font-semibold text-lg my-7 mx-2">Latest Bookings</p>
                    {
                        dashboardData.appointments.map((appointment, index) =>
                            <div key={index} className="flex items-center justify-between mb-2">
                                <div className="flex items-center">
                                    <img className="w-15 rounded-full" src={appointment.userData.image} alt="" />
                                    <div className="ml-2">
                                        <p className="font-semibold text-lg">{appointment.userData.name}</p>
                                        <p className="text-gray-600 text-sm">Booking on {appointment.slotDate}</p>
                                    </div>
                                </div>
                                {appointmentStatus(appointment)}

                            </div>)
                    }
                </div>
            </div>
        </>
    )
}

export default DoctorDashboard