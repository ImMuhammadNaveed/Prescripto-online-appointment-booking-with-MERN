import { useEffect, useState } from "react"
import { useContext } from "react"
import { userContext } from "../context/Context"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import Loading from '../components/Loading'

function AppointmentBooking({docId}) {
    const today = new Date()
    const [days, setDays] = useState([])
    const [slots, setSlots] = useState([])
    const [selectedDay, setSelectedDay] = useState(today)
    const [selectedSlot, setSelectedSlot] = useState(null)
    const [loading, setLoading] = useState(false) 

    function isActiveDay(day) {
        return day.fullDay.toDateString() === selectedDay.toDateString()
    }
    function isActiveSlot(slot) {
        return slot === selectedSlot
    }

    const navigate = useNavigate()
    const{isLoggedIn, backend_url} = useContext(userContext) 

    function generateDays() {
        let tempDays = []
        for (let i = 0; i < 7; i++) {
            let currentDay = new Date()
            currentDay.setDate(today.getDate() + i)
            tempDays.push({
                "day": currentDay.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
                "date": currentDay.getDate(),
                "fullDay": currentDay
            })
        }
        setDays(tempDays)
    }

    function generateSlots() {
        let tempSlots = []
        let startingTime = new Date()
        let endingTime = new Date()
        let now = new Date()
        startingTime.setHours(10, 0, 0, 0)
        endingTime.setHours(20, 30, 0, 0)
        while (startingTime <= endingTime) {
            if (selectedDay.toDateString()!==now.toDateString() || startingTime > now) {
                let startingTimeString = startingTime.toLocaleTimeString("en-US", { 
                        hour: "2-digit", 
                        minute: "2-digit" 
                    })
                tempSlots.push(startingTimeString)
            }
            startingTime.setMinutes(startingTime.getMinutes() + 30)
        }
        setSlots(tempSlots)
        // console.log(slots)
    }

    useEffect(() => {
        generateDays()
        generateSlots()
    }, [selectedDay]
    )

    function formatDate(date) {
        return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
    }

    async function bookSlot(slot) {
        if(!isLoggedIn){
            return navigate("/")
        }
        const fullDate = formatDate(selectedDay)
        // console.log(docId)
        try {
            setLoading(true)
            const {data} = await axios.post(backend_url+"/api/user/book-appointment", {docId:docId, slotDate:fullDate, slotTime:slot}, {withCredentials: true})
            console.log("slot booking response :",data)
            alert(data.message)
        } catch (error) {
            alert(error.response.data.message)
        }finally{
            setLoading(false)
        }
        
        // console.log(fullDate,";", slot )
    }

    return (
        <>
        {loading?<Loading actionName={"Booking appointment..."}/>:""}
        <p className="my-7 text-gray-600 font-semibold">Booking slots</p>
            <div className="flex gap-5">
                {
                    days.map((day, index) => (
                        <div key={index} >
                            <button className={`cursor-pointer border border-gray-300 rounded-full w-20 h-30 text-gray-600 font-semibold ${isActiveDay(day)?"bg-primary text-white":""}`} onClick={()=>setSelectedDay(day.fullDay)}>{day.day} <br /> {day.date}</button>
                        </div>
                    ))
                }
            </div>
            <div className="flex gap-5 overflow-x-scroll scrollbar-hide whitespace-nowrap mt-4">
                {
                    slots.map((slot, index) => (
                        <div key={index}>
                            <button className={`border border-gray-300 text-gray-600 px-3 py-1 rounded-full cursor-pointer ${isActiveSlot(slot)?"bg-primary text-white":""}`} onClick={()=>{setSelectedSlot(slot)}}>{slot}</button>
                        </div>
                    ))
                }
            </div>
            <button onClick={()=>bookSlot(selectedSlot)} className={`bg-primary text-white py-2 px-10 rounded-full text-sm mt-8 ${selectedSlot?"cursor-pointer":"cursor-not-allowed"}`}>Book an appointment</button>
        </>
    )
}
export default AppointmentBooking