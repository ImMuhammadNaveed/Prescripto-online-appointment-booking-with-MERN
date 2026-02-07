import { assets } from "../assets/assets"
import { useEffect } from "react"
function Contact() {

    useEffect(()=>{
            window.scrollTo({top:0, behavior:"smooth"})
        }, [])

    return (
        <>
            <div>
                <p className="text-center text-2xl my-15"><span className="text-gray-600">CONTACT </span><span className="text-gray-700 font-semibold">US</span></p>
                <div className="flex justify-center items-center gap-10">
                    <img src={assets.contact_image} alt="" className="w-100"/>
                    <div>
                        <p className="font-bold text-lg mb-4 text-gray-700">OUR OFFICE</p>
                        <p className="my-6 text-gray-600 text-sm">00000 Willms Station <br />Suite 000, Washington, USA</p>
                        <p className="mb-6 text-gray-600 text-sm">Tel: (000) 000-0000 <br />Email: itsnaveed277@gmail.com</p>
                        <p className="font-bold text-lg mb-4 text-gray-700">CAREERS AT PRESCRIPTO</p>
                        <p className="mb-6 text-gray-700">Learn more about our teams and job openings.</p>
                        <button className="py-4 px-7 border-1 hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer">Explore Jobs</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Contact