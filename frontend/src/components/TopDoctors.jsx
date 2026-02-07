import { useEffect, useState } from 'react'
import { doctors } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../context/Context'
function TopDoctors() {
    const [topDoc, setTopDoc] = useState([])
    const { allDoctors } = useContext(userContext)
    useEffect(() => { setTopDoc(allDoctors.slice(0, 10)) }, [allDoctors])
    const navigate = useNavigate()

    return (
        <>
            <div className='w-[80%] mx-auto justify-center'>
                <p className='text-center text-3xl pb-5 font-medium'>Top Doctors to Book</p>
                <p className='text-center text-sm w-80 m-auto'>Simply browse through our extensive list of trusted doctors.</p>
                <div className='flex flex-wrap justify-center'>
                    {
                        topDoc.map((item, index) => (
                            <div onClick={() => navigate(`/appointment/${item._id}`)} key={index} className='w-[23%] border-1 border-gray-300 m-2 rounded-xl cursor-pointer'>
                                <img src={item.image} alt="" className='w-full h-55 object-cover bg-indigo-50 rounded-xl' />
                                <div className='ml-5 mb-5'>
                                    <div className='flex text-xs mt-5'>
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
                <div className='flex justify-center my-10'>
                    <button className='bg-indigo-50 px-10 py-3 m-auto rounded-full text-gray-600 cursor-pointer' onClick={()=>navigate('/doctors')}>more</button>
                </div>
                
            </div>
        </>
    )
}
export default TopDoctors