import { assets } from '../assets/assets.js'
import { useEffect } from 'react'
function About() {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])

    return (
        <>
            <div className='w-[80%] m-auto'>
                <p className='text-center text-2xl my-15'><span className='text-gray-600'>ABOUT </span><span className='font-semibold text-gray-700'>US</span></p>
                <div className='flex items-center'>
                    <img src={assets.about_image} alt="" className='w-100 h-90 object-contain' />
                    <div className='ml-10'>
                        <p className='text-sm mb-8 text-gray-600 leading-relexed'>Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.</p>
                        <p className='text-sm my-8 text-gray-600 leading-relexed'>Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.</p>
                        <p className='text-sm mb-8 font-semibold leading-relexed'>Our Vision</p>
                        <p className='text-sm text-gray-600 leading-relexed'>Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
                    </div>
                </div>
                <p className='text-2xl my-10'>WHY <span className='text-gray-700 font-semibold'> CHOOSE US</span></p>
                <div className='flex'>
                    <div className='group w-[33.33%] p-20 border p-1 border-gray-200 hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer'>
                        <p className='text-gray-700 font-semibold group-hover:text-white'>EFFICIENCY:</p>
                        <p className='text-gray-600 text-sm leading-relaxed mt-5 group-hover:text-white'>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
                    </div>
                    <div className='group w-[33.33%] p-20 border p-1 border-gray-200 hover:bg-primary text-white transition-colors duration-300 cursor-pointer'>
                        <p className='text-gray-700 font-semibold group-hover:text-white'>CONVENIENCE:</p>
                        <p className='text-gray-600 text-sm leading-relaxed mt-5 group-hover:text-white'>Access to a network of trusted healthcare professionals in your area.</p>
                    </div>
                    <div className='group w-[33.33%] p-20 border p-1 border-gray-200 hover:bg-primary hover:text-white transition-colors duration-300 cursor-pointer'>
                        <p className='text-gray-700 font-semibold group-hover:text-white'>PERSONALIZATION:</p>
                        <p className='text-gray-600 text-sm leading-relaxed mt-5 group-hover:text-white'>Tailored recommendations and reminders to help you stay on top of your health.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
export default About