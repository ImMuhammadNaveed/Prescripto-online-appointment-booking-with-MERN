import { assets } from "../assets/assets"

function Header() {

    function scrollToSpeciality() {
        const section = document.getElementById("speciality-menu")
        section.scrollIntoView({behavior:"smooth"})
    }

    return(
        <>
        <div className="w-[92%] md:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between bg-primary px-4 md:px-20 pt-10 md:pt-20 text-white rounded-lg overflow-hidden">
            {/* -------------left side------------- */}
            <div className="flex flex-col items-center md:items-start">
                <p className="text-3xl md:text-5xl font-semibold leading-tight">Book Appointment <br />With Trusted Doctors</p>
                <div className="flex md:flex-row flex-col my-4 items-center my-6">
                    <img src={assets.group_profiles} alt="" className="w-[120px] object-contain" />
                    <p className="w-full px-5 text-sm md:w-[70%]">Simply browser through our extensive list of trusted doctors. Schedule your appointment hassle-free</p>
                </div>
                <div>
                    <button onClick={scrollToSpeciality} className="bg-white text-gray-600 text-sm px-7 py-3 rounded-full flex cursor-pointer">Book Appointment <img src={assets.arrow_icon} className="ml-1" alt="" /></button>
                </div>
            </div>
            {/* -------------right side------------- */}
            <div>
                <img src={assets.header_img} alt="" className="w-full max-w-[400px] object-cover mt-10 md:mt-30 md:w-100"/>
            </div>
        </div>
        </>
    )
}
export default Header