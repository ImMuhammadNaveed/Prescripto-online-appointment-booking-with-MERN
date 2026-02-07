import { assets } from "../assets/assets"

function Header() {

    function scrollToSpeciality() {
        const section = document.getElementById("speciality-menu")
        section.scrollIntoView({behavior:"smooth"})
    }

    return(
        <>
        <div className="flex mx-auto w-[80%] items-center justify-between bg-primary px-20 pt-20 text-white rounded-lg">
            {/* -------------left side------------- */}
            <div>
                <p className="text-5xl font-semibold leading-tight">Book Appointment <br />With Trusted <br />Doctors</p>
                <div className="flex my-4">
                    <img src={assets.group_profiles} alt="" className="w-[120px] object-contain" />
                    <p className="px-5 text-sm">Simply browser through our extensive list of trusted doctors.<br />Schedule your appointment hassle-free</p>
                </div>
                <button onClick={scrollToSpeciality} className="bg-white text-gray-600 text-sm px-7 py-3 rounded-full flex cursor-pointer">Book Appointment <img src={assets.arrow_icon} className="ml-1" alt="" /></button>
            </div>
            {/* -------------right side------------- */}
            <div>
                <img src={assets.header_img} alt="" className="w-110 object-cover mt-30"/>
            </div>
        </div>
        </>
    )
}
export default Header