import {assets} from '../assets/assets.js'
function Footer() {
    return(
        <>
        <div className='w-[80%] m-auto mt-40 mb-7'>
        <div className='flex gap-10 justify-between items-start' >
            {/* ----------left side--------- */}
            <div className='w-[40%]'>
                <img src={assets.logo} alt="" className='mb-5 w-40'/>
                <p className='text-gray-600 text-sm leading-loose'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            {/* ------------middle------------ */}
            <div className='w-[20%]'>
                <p className='mb-5 text-xl font-medium'>COMPANY</p>
                <ul>
                    <li className='text-gray-600 text-sm mb-3'>Home</li>
                    <li className='text-gray-600 text-sm mb-3'>About us</li>
                    <li className='text-gray-600 text-sm mb-3'>Delivery</li>
                    <li className='text-gray-600 text-sm mb-3'>Privacy policy</li>
                </ul>
            </div>
            {/* -----------right side--------- */}
            <div className='w-[20%]'>
                <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
                <ul>
                    <li className='text-gray-600 text-sm mb-3'>+0-000-000-000</li>
                    <li className='text-gray-600 text-sm mb-3'>itsnaveed277@gmail.com</li>
                </ul>
            </div>
        </div>
        <hr className='mb-[20px] mt-[20px] text-gray-200'/>
        <p className='text-center text-sm'>Copyright 2024 @ Greatstack.dev - All Right Reserved.</p>
        </div>
        </>
    )
}
export default Footer