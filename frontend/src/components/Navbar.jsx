import { useState, useEffect} from "react"
import { assets } from "../assets/assets"
import { useNavigate } from 'react-router-dom'
import { userContext } from "../context/Context"
import { useContext } from "react"
import axios from "axios"
import { useLocation } from "react-router-dom"
import Loading from '../components/Loading'

function Navbar() {
    const {isLoggedIn, userData, setIsLoggedIn, backend_url, setUserData} = useContext(userContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const isActive=(path)=>location.pathname===path

    function redirectToAdmin() {
        window.location.href = "http://localhost:5174/"
    }
    async function handleLogout() {
        try {
            setLoading(true)
            const {data} = await axios.post(backend_url+"/api/user/logout",{},{withCredentials:true})
            if(data.success){
                setIsLoggedIn(false)
                setUserData(false)
                navigate("/")
            }
        } catch (error) {
            alert(error.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <>
        {loading? <Loading actionName={"Logging out..."}/>:""}
            <div className="w-[80%] m-auto">
                <div className="flex justify-between items-center py-4">
                    <img src={assets.logo} alt="" className="w-43 object-contain" />
                    <ul className="flex gap-8 items-center">
                        <li className={`cursor-pointer text-sm font-medium ${isActive('/')?"text-primary":""}`} onClick={() => navigate("/")}>
                            HOME
                        </li>
                        <li className={`cursor-pointer text-sm font-medium ${isActive('/doctors')?"text-primary":""}`} onClick={() => navigate("/doctors")}>
                            ALL DOCTORS
                        </li>
                        <li className={`cursor-pointer text-sm font-medium ${isActive('/about')?"text-primary":""}`} onClick={() => navigate("/about")}>
                            ABOUT
                        </li>
                        <li className={`cursor-pointer text-sm font-medium ${isActive('/contact')?"text-primary":""}`} onClick={() => navigate("/contact")}>
                            CONTACT
                        </li>
                        <button className="text-xs border-1 border-gray-300 rounded-full px-4 py-2 cursor-pointer" onClick={redirectToAdmin}>Admin Panel</button>
                    </ul>
                    {
                        isLoggedIn
                        ?<div className="relative group">
                            <div className="flex gap-2 items-center">
                                <img src={userData?userData.image:assets.upload_area} alt="" className="w-17 object-contain rounded-full"/>
                                <img src={assets.dropdown_icon} alt="" className="w-3 object-contain" />
                                {/* {console.log("navbar: ",uToken)} */}
                            </div>
                            
                            <ul className="invisible group-hover:visible absolute transition-all duration-200 w-50 bg-white pl-4 rounded-lg">
                                <li onClick={()=>navigate("/my-profile")} className="cursor-pointer text-sm mb-2 mt-2">
                                    My Profile
                                </li>
                                <li onClick={()=>navigate("/my-appointments")} className="cursor-pointer text-sm mb-2">
                                    My Appointments
                                </li>
                                <li onClick={handleLogout} className="cursor-pointer text-sm mb-2">
                                    Logout
                                </li>
                            </ul>
                        </div>
                        :<button onClick={()=>navigate("/login")} className="text-white bg-primary border rounded-full px-7 py-3 cursor-pointer text-sm">Create Account</button>
                    }
                    

                </div>
                <hr className="h-3 text-gray-400" />
            </div>
        </>
    )
}
export default Navbar