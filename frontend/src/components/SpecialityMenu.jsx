import { useNavigate } from "react-router-dom"
import { assets, specialityData } from "../assets/assets"
function SpecialityMenu() {
    const navigate = useNavigate()
    return (
        <>
            <div className="w-[92%] mx-auto overflow-hidden flex flex-col items-center justify-center py-10 mb-25" id="speciality-menu">
                <p className="text-3xl pb-5 font-medium">Find by Speciality</p>
                <p className=" text-sm mb-6 text-center">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free</p>
                <div className="w-full flex justify-start md:justify-center text-sm overflow-x-auto md:overflow-visible md:gap-4 gap-0 px-2">
                    {
                        specialityData.map((item, index) => (
                            <div onClick={() => navigate(`/doctors/${item.speciality}`)}
                                key={index}
                                className="flex flex-col items-center cursor-pointer min-w-[28%] md:min-w-0">
                                <img src={item.image} alt="" className="md:w-20 w-16 object-contain" />
                                <p className="mt-3 text-xs">{item.speciality}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
export default SpecialityMenu