import { useContext } from "react"
import axios from 'axios'
import { userContext } from "../context/Context"
import { useState, useEffect } from "react"

function MyAppointments() {
    const { backend_url, isLoggedIn } = useContext(userContext)
    const [appointments, setAppointments] = useState([])

    useEffect(()=>{
        window.scrollTo({top:0, behavior:"smooth"})
    }, [])

    async function getAppointments() {
        try {
            const { data } = await axios.get(backend_url + "/api/user/my-appointments", {withCredentials: true })
            console.log("my appointments: ", data)
            if (data.success) {
                setAppointments(data.myAppointments.reverse())
            }
        } catch (error) {
            console.log(error.response)
        }
    }
    useEffect(() => { getAppointments() }, [isLoggedIn])

    async function handleCancelAppointment(appointmentId) {
        try {
            const { data } = await axios.post(backend_url + "/api/user/cancel-appointment", { appointmentId: appointmentId }, {withCredentials: true })
            if (data.success) {
                getAppointments()
            }
            alert(data.message)
        } catch (error) {
            alert(error.message)
        }
    }
    return (
        <>
            <div className="w-[80%] m-auto">
                {
                    appointments.map((item, index) => (
                        <div key={index} className="flex justify-between items-center my-2">
                            <div className="flex items-center">
                                <img src={item.doctorData.image} alt="" className="w-34 bg-indigo-100" />
                                <div className="text-sm ml-4">
                                    <p className="text-lg font-semibold">{item.doctorData.name}</p>
                                    <p className="text-gray-600">{item.doctorData.speciality}</p>
                                    <p className="font-semibold">Address:</p>
                                    <p className="text-gray-600">{item.doctorData.address.line1}</p>
                                    <p className="text-gray-600">{item.doctorData.address.line2}</p>
                                    <p className="font-semibold">Date & Time: </p>
                                    <p className="text-gray-600">{item.slotDate + " " + item.slotTime}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {item.cancelAppointment
                                    ? (<button className="border border-red-500 text-red-500 text-sm py-1 px-4">Cancelled</button>)
                                    :item.isCompleted?(<button className="border border-green-500 text-green-500 text-sm py-1 px-4">Completed</button>)
                                    : (<><button className="border py-2 px-3 hover:text-white hover:bg-indigo-500 transition-colors duration-300 cursor-pointer">Online payment</button>
                                        <button className="border py-2 px-3 hover:text-white hover:bg-red-500 transition-colors duration-300 cursor-pointer" onClick={()=>handleCancelAppointment(item._id)}>Cancel appointment</button></>)
                                }
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}
export default MyAppointments