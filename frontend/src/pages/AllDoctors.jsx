import { useNavigate, useParams } from "react-router-dom"
import { doctors } from "../assets/assets"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { userContext } from "../context/Context"
function AllDoctors() {
    const { speciality } = useParams()
    const { allDoctors } = useContext(userContext)
    // const [specialityState, setSpecialityState] = useState(speciality)
    // useEffect(() => {
    //     setSpecialityState(speciality)
    // }, [])
    console.log("speciality by params: ", speciality)
    const [fillDoctors, setFillDoctors] = useState([])
    const navigate = useNavigate()

    function handleClick(value) {
        if (speciality === value) {
            navigate("/doctors")
        } else {
            navigate(`/doctors/${value}`)
        }
    }

    useEffect(() => {
        if (speciality) {
            // console.log(specialityState)
            let fillDoc = allDoctors.filter((doc) => doc.speciality === speciality)
            setFillDoctors(fillDoc)
        } else {
            setFillDoctors(allDoctors)
        }
    }, [allDoctors, speciality])

    useEffect(()=>{
        window.scrollTo({top:0, behavior:"smooth"})
    }, [])
    return (
        <>
            <div className="w-[80%] mx-auto ">
                <p className="text-gray-600 my-3">Browse through the doctors specialist.</p>
                <div className="flex items-start gap-6">
                    <div className="left-0">
                        <ul>
                            <li className={`text-gray-600 text-sm border border-gray-200 rounded-lg px-5 py-2 mb-3 w-50 cursor-pointer ${speciality==="General physician"?"bg-indigo-50 text-black":""}`} onClick={() => handleClick("General physician")}>General physician</li>
                            <li className={`text-gray-600 text-sm border border-gray-200 rounded-lg px-5 py-2 mb-3 w-50 cursor-pointer ${speciality==="Gynecologist"?"bg-indigo-50 text-black":""}`} onClick={() => handleClick("Gynecologist")}>Gynecologist</li>
                            <li className={`text-gray-600 text-sm border border-gray-200 rounded-lg px-5 py-2 mb-3 w-50 cursor-pointer ${speciality==="Dermatologist"?"bg-indigo-50 text-black":""}`} onClick={() => handleClick("Dermatologist")}>Dermatologist</li>
                            <li className={`text-gray-600 text-sm border border-gray-200 rounded-lg px-5 py-2 mb-3 w-50 cursor-pointer ${speciality==="Pediatricians"?"bg-indigo-50 text-black":""}`} onClick={() => handleClick("Pediatricians")}>Pediatricians</li>
                            <li className={`text-gray-600 text-sm border border-gray-200 rounded-lg px-5 py-2 mb-3 w-50 cursor-pointer ${speciality==="Neurologist"?"bg-indigo-50 text-black":""}`} onClick={() => handleClick("Neurologist")}>Neurologist</li>
                            <li className={`text-gray-600 text-sm border border-gray-200 rounded-lg px-5 py-2 mb-3 w-50 cursor-pointer ${speciality==="Gastroenterologist"?"bg-indigo-50 text-black":""}`} onClick={() => handleClick("Gastroenterologist")}>Gastroenterologist</li>
                        </ul>
                    </div>
                    <div className='flex-1'>
                        <div className='flex flex-wrap justify-center'>
                            {
                                fillDoctors.map((item, index) => (
                                    <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='w-60 border-1 border-gray-300 m-2 rounded-md cursor-pointer'>
                                        <img className="bg-indigo-50" src={item.image} alt="" />
                                        <div className="p-4">
                                            <div className='flex text-xs'>
                                                <div className='w-2.5 h-2.5 bg-green-500 rounded-full mr-1 mt-1'></div>
                                                <p className='text-green-500'>Available</p>
                                            </div>
                                            <p className='font-semibold text-base my-1'>{item.name}</p>
                                            <p className='text-sm text-gray-600'>{item.speciality}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default AllDoctors