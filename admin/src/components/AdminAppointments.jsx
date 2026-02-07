import { useEffect, useState } from "react"
import { useContext } from "react"
import { adminContext } from '../context/AdminContext'
import axios from "axios"
import { doctorContext } from "../context/DoctorContext"
import { assets } from "../assets/assets"
import Loading from '../components/Loading'

function AdminAppointments(params) {

    const { backend_url } = useContext(adminContext)
    const { ageCalculation } = useContext(doctorContext)
    const [appointments, setAppointments] = useState([])
    const [loadingAppointments, setLoadinAppointments] = useState(false)
    const [loadingCancelApp, setLoadingCancelApp] = useState(false)
    const [loadingCompleteApp, setLoadingCompleteApp] = useState(false)

    async function getAdminAppointments() {
        try {
            setLoadinAppointments(true)
            const { data } = await axios.get(backend_url + "/api/admin/all-appointments", { withCredentials: true })
            if (data.success) {
                setAppointments(data.data)
            }
        } catch (error) {
            alert(error)
        }finally{
            setLoadinAppointments(false)
        }
    }
    useEffect(() => { getAdminAppointments() }, [])

    function appointmentStatus(appointment) {
        if (appointment.cancelAppointment) {
            return (<p className="text-sm text-red-500">Cancelled</p>)
        }
        if (appointment.isCompleted) {
            return (<p className="text-sm text-green-500">Completed</p>)
        }
        return (
            <div className="flex">
                <button onClick={() => handleCompleteAppointment(appointment._id)}><img src={assets.tick_icon} alt="" className="cursor-pointer w-10" /></button>
                <button onClick={() => handleCancelAppointment(appointment._id)}><img src={assets.cancel_icon} alt="" className="cursor-pointer w-10" /></button>
            </div>
        )
    }
    async function handleCancelAppointment(id) {
        try {
            setLoadingCancelApp(true)
            const { data } = await axios.post(backend_url + "/api/admin/cancel-appointment", { appointmentId: id }, { withCredentials: true })
            alert(data.message)
            if (data.success) {
                getAdminAppointments()
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
            const { data } = await axios.post(backend_url + "/api/admin/complete-appointment", { appointmentId: id }, { withCredentials: true })
            alert(data.message)
            if (data.success) {
                getAdminAppointments()
            }
        } catch (error) {
            alert(error.response.data.message)
        }finally{
            setLoadingCompleteApp(false)
        }
    }

    return (
        <>
            {loadingAppointments?<Loading actionName={"Loading Appointments..."}/>:""}
            {loadingCancelApp?<Loading actionName={"Canceling Appointment..."}/>:""}
            {loadingCompleteApp?<Loading actionName={"Completing Appointment..."}/>:""}
            <div className="w-[85%]">
            <table className="text-left border-separate border-spacing-y-3">
                <thead>
                    <tr>
                        <th className="text-left w-[5%]">#</th>
                        <th className="text-left w-[27%]">Patient</th>
                        <th className="text-left w-[7%]">Age</th>
                        <th className="text-left w-[20%]">Date & Time</th>
                        <th className="text-left w-[30%]">Doctor</th>
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
                                <td>
                                    <div className="flex items-center">
                                        <img src={appointment.doctorData.image} alt="" className="w-15 rounded-full" />
                                        <p className="text-sm text-gray-600 ml-2">{appointment.doctorData.name}</p>
                                    </div>
                                </td>
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



export default AdminAppointments