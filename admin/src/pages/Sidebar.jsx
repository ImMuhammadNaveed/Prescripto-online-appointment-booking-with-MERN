import { assets } from "../assets/assets"
import { useContext } from "react"
import { adminContext } from "../context/AdminContext"
import { NavLink, useLocation } from "react-router-dom"
function Sidebar() {
    const {isALoggedIn} = useContext(adminContext)
    const location = useLocation()

    function isActive(path){
        return location.pathname === path
    }

    return(
        <>
        <div className="mr-2 w-65">
                <NavLink to="/" className={`flex cursor-pointer items-center py-3 px-15 hover:bg-indigo-50 ${isActive('/')?"border-r-4 border-primary bg-indigo-100":""}`}><img src={assets.home_icon} className="w-5 mr-2" alt="" />Dashboard</NavLink>
                <NavLink to="/appointments" className={`flex cursor-pointer items-center py-3 px-15 hover:bg-indigo-50 ${isActive('/appointments')?"border-r-4 border-primary bg-indigo-100":""}`}><img src={assets.appointment_icon} className="w-5 mr-2" alt="" />Appointments</NavLink>
                {
                    isALoggedIn
                    ?<>
                        <NavLink to="/add-new-doctor" className={`flex cursor-pointer items-center py-3 px-15 hover:bg-indigo-50 ${isActive('/add-new-doctor')?"border-r-4 border-primary bg-indigo-100":""}`}><img src={assets.add_icon} className="w-5 mr-2" alt="" />Add Doctor</NavLink>
                        <NavLink to="/doctors-list" className={`flex cursor-pointer items-center py-3 px-15 hover:bg-indigo-50 ${isActive('/doctors-list')?"border-r-4 border-primary bg-indigo-100":""}`}><img src={assets.people_icon} className="w-5 mr-2" alt="" />Doctors List</NavLink>
                    </>
                    :<><NavLink to="/profile" className={`flex cursor-pointer items-center py-3 px-15 hover:bg-indigo-50 ${isActive('/profile')?"border-r-4 border-primary bg-indigo-100":""}`}><img src={assets.people_icon} className="w-5 mr-2" alt="" />Profile</NavLink></>
                }
                
        </div>
        </>
    )
}
export default Sidebar