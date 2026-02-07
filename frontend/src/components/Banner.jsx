import { assets } from "../assets/assets"
import {useNavigate} from 'react-router-dom'

function Banner() {
    const navigate = useNavigate()
    return(
        <>
        <div className="w-[80%] m-auto flex items-center gap-30 justify-center bg-primary rounded-xl pt-5 pl-13">
            {/* ---------left side--------- */}
            <div>
                <p className="text-5xl text-white font-semibold leading-tight ">Book Appointment <br />With 100+ Trusted <br />Doctors</p>
                <button className="bg-white rounded-full px-10 py-3 text-gray-600 mt-7 cursor-pointer" onClick={()=>navigate("/login")}>Create account</button>
            </div>
            {/* ---------right side-------- */}
            <div>
                <img src={assets.appointment_img} alt="" className="w-100 h-100 object-contain"/>
            </div>
        </div>
        </>
    )
}
export default Banner