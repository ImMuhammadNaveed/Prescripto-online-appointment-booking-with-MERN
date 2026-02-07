import {useNavigate } from "react-router-dom"
import { assets, specialityData } from "../assets/assets"
function SpecialityMenu() {
    const navigate = useNavigate()
    return (
        <>
            <div className="flex flex-col items-center py-10 mb-25" id="speciality-menu">
                <p className="text-3xl pb-5 font-medium">Find by Speciality</p>
                <p className="text-sm mb-5">Simply browse through our extensive list of trusted <br /> doctors, schedule your appointment hassle-free</p>
                <div className="flex justify-center text-sm">
                {
                    specialityData.map((item, index) => (
                        <div onClick={()=>navigate(`/doctors/${item.speciality}`)} key={index} className="flex flex-col items-center m-2 cursor-pointer">
                            <img src={item.image} alt="" className="w-25 object-contain" />
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