import { useEffect, useState } from "react"
import { useContext } from "react"
import { adminContext } from '../context/AdminContext'
import axios from "axios"
import { doctorContext } from "../context/DoctorContext"
import { assets } from "../assets/assets"
import Loading from "./Loading"

function DoctorAppointments() {

    const { backend_url } = useContext(adminContext)
    const { ageCalculation } = useContext(doctorContext)
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingCancelApp, setLoadingCancelApp] = useState(false)
    const [loadingCompleteApp, setLoadingCompleteApp] = useState(false)

    async function getDoctorAppointments() {
        try {
            setLoading(true)
            const { data } = await axios.get(backend_url + "/api/doctor/appointments", { withCredentials: true })
            if (data.success) {
                setAppointments(data.data)
            }
        } catch (error) {
            alert(error)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => { getDoctorAppointments() }, [])

    function appointmentStatus(appointment) {
        if (appointment.cancelAppointment) {
            return (<p className="text-sm text-red-500">Cancelled</p>)
        }
        if (appointment.isCompleted) {
            return (<p className="text-sm text-green-500">Completed</p>)
        }
        return (
            <>
                <button onClick={() => handleCompleteAppointment(appointment._id)}><img src={assets.tick_icon} alt="" /></button>
                <button onClick={() => handleCancelAppointment(appointment._id)}><img src={assets.cancel_icon} alt="" /></button>
            </>
        )
    }
    async function handleCancelAppointment(id) {
        try {
            setLoadingCancelApp(true)
            const { data } = await axios.post(backend_url + "/api/doctor/cancel-appointment", { appointmentId: id }, { withCredentials: true })
            alert(data.message)
            if (data.success) {
                getDoctorAppointments()
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
                getDoctorAppointments()
            }
        } catch (error) {
            alert(error.response.data.message)
        }finally{
            setLoadingCompleteApp(false)
        }
    }
    return (
        <>
        {loading?<Loading actionName={"Appointments loading..."}/>:""}
        {loadingCancelApp?<Loading actionName={"Appointment Canceling..."}/>:""}
        {loadingCompleteApp?<Loading actionName={"Appointment Completing..."}/>:""}
        <div className="w-[85%]">
            <table className="text-left border-separate border-spacing-y-3">
                <thead>
                    <tr>
                        <th className="text-left w-[5%]">#</th>
                        <th className="text-left w-[35%]">Patient</th>
                        <th className="text-left w-[10%]">Age</th>
                        <th className="text-left w-[30%]">Date & Time</th>
                        <th className="text-left w-[10%]">Fees</th>
                        <th className="text-left w-[25%]">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        appointments.map((appointment, index) => (
                            <tr key={appointment._id} className="mb-3">
                                <td className="text-sm text-gray-600">{index + 1}</td>
                                <td>
                                    <div className="flex items-center">
                                        <img src={appointment.userData.image} alt="" className="w-15 rounded-full" />
                                        <p className="text-sm text-gray-600 ml-2">{appointment.userData.name}</p>
                                    </div>
                                </td>
                                <td className="text-sm text-gray-600">{ageCalculation(appointment.userData.DOB)}</td>
                                <td className="text-sm text-gray-600">{appointment.slotDate}, {appointment.slotTime}</td>
                                <td className="text-sm text-gray-600">${appointment.amount}</td>
                                <td>{appointmentStatus(appointment)}</td>
                            </tr>)
                        )
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}



export default DoctorAppointments