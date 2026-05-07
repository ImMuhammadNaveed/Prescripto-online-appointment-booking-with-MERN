import { useState, useEffect } from "react"
import { assets } from "../assets/assets"
import { useNavigate } from 'react-router-dom'
import { userContext } from "../context/Context"
import { useContext } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useLocation } from "react-router-dom"
import Loading from '../components/Loading'
import { BiMenuAltRight } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

function Navbar() {
    const { isLoggedIn, userData, setIsLoggedIn, backend_url, setUserData } = useContext(userContext)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const isActive = (path) => location.pathname === path
    const adminUrl = import.meta.env.VITE_ADMIN_URL
    const [openMenu, setOpenMenu] = useState(false)
    const [openDropdown, setOpenDropdown] = useState(false)
    
    useEffect(() => {
        setOpenMenu(false)
    }, [location.pathname])

    useEffect(()=>{
        setOpenDropdown(false)
    }, [location.pathname])

    function redirectToAdmin() {
        window.location.href = adminUrl
    }
    async function handleLogout() {
        try {
            setLoading(true)
            const { data } = await axios.post(backend_url + "/api/user/logout", {}, { withCredentials: true })
            if (data.success) {
                setIsLoggedIn(false)
                setUserData(false)
                navigate("/")
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    function openMenuUI() {
        return (
            <>
                <div className="fixed top-0 left-0 w-full h-screen z-50 bg-white">
                    <div className="mx-6 my-4 flex items-center justify-between ">
                        <Link to='/'>
                            <img src={assets.logo} alt="" className="w-36 object-contain" />
                        </Link>
                        <button>
                            <IoCloseOutline
                                size={36}
                                onClick={() => setOpenMenu(false)}

                            />
                        </button>
                    </div>
                    <div className="flex flex-col gap-6 items-center mt-8">
                        <Link to='/' className={`${isActive('/') ? 'bg-primary text-white' : ""} px-6 py-2 rounded-lg`}>HOME</Link>
                        <Link to='/doctors' className={`${isActive('/doctors') ? 'bg-primary text-white' : ""} px-6 py-2 rounded-lg`}>ALL DOCTORS</Link>
                        <Link to='/about' className={`${isActive('/about') ? 'bg-primary text-white' : ""} px-6 py-2 rounded-lg`}>ABOUT</Link>
                        <Link to='/contact' className={`${isActive('/contact') ? 'bg-primary text-white' : ""} px-6 py-2 rounded-lg`}>CONTACT</Link>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {
                openMenu && openMenuUI()
            }
            {loading ? <Loading actionName={"Logging out..."} /> : ""}
            <div className={`w-[92%] md:w-[80%] mx-auto`}>
                <div className="flex justify-between items-center py-4">

                    {/* logo */}
                    <Link to='/'>
                        <img src={assets.logo} alt="" className="w-42 md:w-43 object-contain" />
                    </Link>


                    {/* menu on desktop */}
                    <div className="hidden md:flex flex-1 justify-center">
                        <ul className="flex gap-8 items-center">
                            <li className={`cursor-pointer text-sm font-medium ${isActive('/') ? "text-primary" : ""}`} onClick={() => navigate("/")}>
                                HOME
                            </li>
                            <li className={`cursor-pointer text-sm font-medium ${isActive('/doctors') ? "text-primary" : ""}`} onClick={() => navigate("/doctors")}>
                                ALL DOCTORS
                            </li>
                            <li className={`cursor-pointer text-sm font-medium ${isActive('/about') ? "text-primary" : ""}`} onClick={() => navigate("/about")}>
                                ABOUT
                            </li>
                            <li className={`cursor-pointer text-sm font-medium ${isActive('/contact') ? "text-primary" : ""}`} onClick={() => navigate("/contact")}>
                                CONTACT
                            </li>
                            <button className="text-xs border-1 border-gray-300 rounded-full px-4 py-2 cursor-pointer" onClick={redirectToAdmin}>Admin Panel</button>
                        </ul>
                    </div>
                    <div className="flex items-center gap-3">
                        {
                            isLoggedIn
                                ? <div className="relative group flex justify-end ">
                                    <div className="flex gap-2 items-center cursor-pointer" onClick={()=>setOpenDropdown(!openDropdown)}>
                                        <div className="md:h-16 md:w-16 w-12 h-12 rounded-full overflow-hidden">
                                            <img src={userData ? userData.image : assets.upload_area} alt="" className="object-cover w-full h-full" />
                                        </div>
                                        <img src={assets.dropdown_icon} alt="" className="w-3 object-contain" />
                                        {/* {console.log("navbar: ",uToken)} */}
                                    </div>
                                    {openDropdown&&
                                    (<ul className=" absolute transition-all duration-200 w-32 bg-white pl-4 rounded-lg top-16 left-0">
                                        <li onClick={() => navigate("/my-profile")} className="cursor-pointer text-sm mb-2 mt-2">
                                            My Profile
                                        </li>
                                        <li onClick={() => navigate("/my-appointments")} className="cursor-pointer text-sm mb-2">
                                            My Appointments
                                        </li>
                                        <li onClick={handleLogout} className="cursor-pointer text-sm mb-2">
                                            Logout
                                        </li>
                                    </ul>)}
                                </div>
                                : <button onClick={() => navigate("/login")} className="hidden md:block text-white bg-primary border rounded-full px-7 py-3 cursor-pointer text-sm">Create Account</button>
                        }
                        <button className="md:hidden">
                            <BiMenuAltRight
                                onClick={() => setOpenMenu(true)}
                                size='40'
                                color='#5F6FFF'
                            />
                        </button>
                    </div>
                </div>
                <hr className="h-3 text-gray-400" />
            </div >
        </>
    )
}
export default Navbar