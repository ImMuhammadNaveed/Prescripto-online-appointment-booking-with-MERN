import {assets} from "../assets/assets"
import { useContext } from "react"
import { adminContext } from "../context/AdminContext"
import { doctorContext } from "../context/DoctorContext"
import {useNavigate} from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import Loading from "../components/Loading"

function Navbar() {
    const {isALoggedIn, setIsALoggedIn, backend_url} = useContext(adminContext)
    const {isDLoggedIn, setIsDLoggedIn} = useContext(doctorContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handeLogout() {
        if(isALoggedIn){
            try {
                setLoading(true)
                const {data} = await axios.post(backend_url+"/api/admin/logout", {}, {withCredentials: true})
                alert(data.message)
            } catch (error) {
                alert(error.message)
            }finally{
                setLoading(false)
            }
            setIsALoggedIn(false)
        }else if(isDLoggedIn){
            try {
                setLoading(true)
                const {data} = await axios.post(backend_url+"/api/doctor/logout", {}, {withCredentials: true})
                alert(data.message)
            } catch (error) {
                alert(error.message)
            }finally{
                setLoading(false)
            }
            setIsDLoggedIn(false)
        }
        navigate("/")
    }
    return(
        <>
        {loading?<Loading actionName={"Logging out..."}/>:""}
        <div className="mb-1">
            <div className="flex justify-between items-center my-3">
                <div className="flex items-center ml-15">
                    <img src={assets.admin_logo} alt="" />
                    <p className="text-sm border border-gray-600 rounded-full px-4 py-1 ml-2">{isALoggedIn?"Admin":"Doctor"}</p>
                </div>
                <button onClick={handeLogout} className=" mr-15 cursor-pointer bg-primary px-7 py-1 rounded-full text-white">Logout</button>
                
            </div>
            <hr className="h-3 text-gray-300"/>
            </div>
        </>
    )
}
export default Navbar