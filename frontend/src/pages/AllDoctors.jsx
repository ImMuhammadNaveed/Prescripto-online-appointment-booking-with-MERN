import { useNavigate, useParams } from "react-router-dom"
import { doctors } from "../assets/assets"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { userContext } from "../context/Context"
function AllDoctors() {
    const { speciality } = useParams()
    const { allDoctors } = useContext(userContext)
    const [fillDoctors, setFillDoctors] = useState([])
    const navigate = useNavigate()
    const [showFilters, setShowFilters] = useState(false)

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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])
    return (
        <>
            <div className="w-[92%] md:w-[80%] mx-auto ">
                <p className="text-gray-600 my-3">Browse through the doctors specialist.</p>
                <button
                    className={`block md:hidden border border-gray-300 px-4 py-2 rounded-md mb-4 ${showFilters?"bg-primary text-white":""}`}
                    onClick={()=>setShowFilters(!showFilters)}
                >
                    Filters
                </button>
                <div className="flex md:flex-row flex-col md:items-start gap-6 ">
                    <div className={`left-0 ${showFilters?"block":"hidden"} md:block`}>
                        <ul>
                            <li className={`text-gray-600 text-sm border border-gray-300 rounded-md px-4 py-2 mb-3 ${showFilters?"w-full":"w-50"} cursor-pointer ${speciality === "General physician" ? "bg-indigo-50 text-black" : ""}`} onClick={() => handleClick("General physician")}>General physician</li>
                            <li className={`text-gray-600 text-sm border border-gray-300 rounded-md px-4 py-2 mb-3 ${showFilters?"w-full":"w-50"} cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-50 text-black" : ""}`} onClick={() => handleClick("Gynecologist")}>Gynecologist</li>
                            <li className={`text-gray-600 text-sm border border-gray-300 rounded-md px-4 py-2 mb-3 ${showFilters?"w-full":"w-50"} cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-50 text-black" : ""}`} onClick={() => handleClick("Dermatologist")}>Dermatologist</li>
                            <li className={`text-gray-600 text-sm border border-gray-300 rounded-md px-4 py-2 mb-3 ${showFilters?"w-full":"w-50"} cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-50 text-black" : ""}`} onClick={() => handleClick("Pediatricians")}>Pediatricians</li>
                            <li className={`text-gray-600 text-sm border border-gray-300 rounded-md px-4 py-2 mb-3 ${showFilters?"w-full":"w-50"} cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-50 text-black" : ""}`} onClick={() => handleClick("Neurologist")}>Neurologist</li>
                            <li className={`text-gray-600 text-sm border border-gray-300 rounded-md px-4 py-2 mb-3 ${showFilters?"w-full":"w-50"} cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-50 text-black" : ""}`} onClick={() => handleClick("Gastroenterologist")}>Gastroenterologist</li>
                        </ul>
                    </div>
                    <div className='flex-1'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 '>
                            {
                                fillDoctors.map((item, index) => (
                                    <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='border-1 border-gray-300 m-2 rounded-md cursor-pointer'>
                                        <img className="w-full bg-indigo-50" src={item.image} alt="" />
                                        <div className="p-4">
                                            {
                                                item.available
                                                    ? <div className='flex text-xs'>
                                                        <div className='w-2.5 h-2.5 bg-green-500 rounded-full mr-1 mt-[2px] '></div>
                                                        <p className='text-green-500'>Available</p>
                                                    </div>
                                                    : <div className='flex text-xs'>
                                                        <div className='w-2.5 h-2.5 bg-red-500 rounded-full mr-1 mt-[2px]'></div>
                                                        <p className='text-red-500'>Unavailable</p>
                                                    </div>
                                            }
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