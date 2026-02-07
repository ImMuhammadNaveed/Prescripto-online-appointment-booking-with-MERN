import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { assets } from "../assets/assets"
import AppointmentBooking from "../components/AppointmentBooking"
import RelatedDoctors from "../components/RelatedDoctors"
import { useContext } from "react"
import { userContext } from "../context/Context"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Appointment() {
    const { docId } = useParams()
    const [docInfo, setDocInfo] = useState({})
    const navigate = useNavigate()
    const {isLoggedIn, backend_url, allDoctors} = useContext(userContext)

    useEffect(()=>{
        window.scrollTo({top:0, behavior:"smooth"})
    }, [])

    function findDoctor() {
        const doctor = allDoctors.find((doc) => doc._id === docId)
        setDocInfo(doctor)
        // console.log(docInfo)
    }
    useEffect(() => { findDoctor() }, [docId, allDoctors])

    async function bookSlot() {
        if(!isLoggedIn){
            return navigate("/")
        }
        try {
            const {data} = await axios.post(backend_url+"/api/user/book-appointment", {docId:docId, slotDate:fullDate, slotTime:slot}, {withCredentials:true})
            console.log(data)
        } catch (error) {
            console.log(error.response.data)
        }
    }


    return (
        <>
            <div className="w-[80%] m-auto">
                <div className="flex items-center">
                    <img src={docInfo&& docInfo.image} alt="" className="w-62 object-contain bg-primary rounded-lg"/>
                    <div className="border border-gray-500 rounded-lg p-6 ml-3">
                        <p className="flex text-3xl font-semibold text-gray-600">{docInfo&& docInfo.name} <img className="w-5 ml-1" src={assets.verified_icon} alt="" /> </p>
                        <p className="text-gray-600">{docInfo&& docInfo.degree} - {docInfo&& docInfo.speciality}</p>
                        <p className="flex">About <img className="w-3 ml-1" src={assets.info_icon} alt="" /> </p>
                        <p className="text-gray-600 text-sm">{docInfo&& docInfo.about}</p>
                        <p className="mt-3">Appointment fee: <span className="font-semibold">${docInfo&& docInfo.fee}</span></p>
                    </div>
                    
                </div>
                <div className="ml-65">
                    <AppointmentBooking docId={docId}/>
                </div>
                
                <RelatedDoctors docId={docId} speciality={docInfo&& docInfo.speciality}/>
            </div>
        </>
    )
}
export default Appointment