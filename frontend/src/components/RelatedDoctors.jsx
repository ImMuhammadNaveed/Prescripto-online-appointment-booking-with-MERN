import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { userContext } from "../context/Context"

function RelatedDoctors({docId, speciality}) {
    const {allDoctors} = useContext(userContext)
    const navigate = useNavigate()
    const [relatedDrs, setRelatedDrs] = useState([])
    function findRelatedDrs() {
        setRelatedDrs(allDoctors.filter((dr)=>dr._id!==docId&&dr.speciality===speciality))
        // console.log(relatedDrs)
    }
    useEffect(()=>{
        findRelatedDrs()
        // console.log(relatedDrs)
    },[docId, speciality])

    return allDoctors&&(
        <>
        <div className='w-[80%] mx-auto justify-center mt-15'>
            <p className='text-center my-5 text-3xl font-semibold'>Related Doctors</p>
            <p className='text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
            <div className='flex flex-wrap justify-center'>
            {
                relatedDrs.map((item, index)=>(
                    <div onClick={()=>navigate(`/appointment/${item._id}`)} key={index} className='w-[17%] border-1 border-gray-300 m-1 p-2 rounded-md'>
                        <img src={item.image} alt="" />
                        <div className='flex text-xs'>
                            <div className='w-2.5 h-2.5 bg-green-500 rounded-full mr-1 mt-1'></div>
                            <p className='text-green-500'>Available</p>
                        </div>
                        <p className='font-semibold text-base'>{item.name}</p>
                        <p className='text-sm'>{item.speciality}</p>
                    </div>
                ))
            }
            </div>
        </div>
        </>
    )
}
export default RelatedDoctors