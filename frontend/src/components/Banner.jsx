import { assets } from "../assets/assets"
import { useNavigate } from 'react-router-dom'

function Banner() {
    const navigate = useNavigate()
    return (
        <>
            <div className="w-[92%] md:w-[80%] m-auto flex items-center md:justify-center bg-primary rounded-xl md:py-0 md:pt-4 py-8 md:px-14 pl-8">
                {/* ---------left side--------- */}
                <div>
                    <p className="text-2xl md:text-5xl text-white font-semibold md:leading-tight leading-normal">Book Appointment <br />With 100+ Trusted Doctors</p>
                    <button className="bg-white rounded-full px-10 py-3 text-gray-600 mt-7 cursor-pointer" onClick={() => navigate("/login")}>Create account</button>
                </div>
                {/* ---------right side-------- */}
                <div>
                    <img
                        src={assets.appointment_img}
                        alt=""
                        className="hidden md:block w-120 h-100 object-contain"
                    />
                </div>
            </div>
        </>
    )
}
export default Banner