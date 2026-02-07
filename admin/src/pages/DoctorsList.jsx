import { useContext, useEffect } from "react"
import { adminContext } from "../context/AdminContext"
import axios from "axios"
import { useState } from "react"
import Loading from '../components/Loading'

function DoctorsList() {
    const { allDoctors, getAllDoctors, backend_url } = useContext(adminContext)
    const [loading, setLoading] = useState(false)

    async function setDrAvailability(drId) {
        try {
            setLoading(true)
            const response = await axios.post(backend_url + "/api/admin/set-dr-availability", { drId: drId }, { withCredentials: true })
            if (response.data.success) {
                getAllDoctors()
                alert(response.data.message)

            }
            console.log(response.data)
        } catch (error) {
            console.log(error.message)
        }finally{
            setLoading(false)
        }
    }
    return allDoctors && (
        <>
        {loading?<Loading actionName={"Updating doctor status..."}/>:""}
            <div>
                <p className="text-lg font-semibold my-5">All Doctors</p>
                <div className="flex gap-2">
                    {
                        allDoctors.map((doctor) =>
                            <div className="w-45 border border-gray-300 rounded-lg" key={doctor._id}>
                                <img className="bg-indigo-50 rounded-lg" src={doctor.image} alt="" />
                                <div className="p-2">
                                    <p className="text-lg font-semibold">{doctor.name}</p>
                                    <p className="text-sm text-gray-600">{doctor.speciality}</p>
                                    <div className="flex gap-1 items-center">
                                        <input type="checkbox" className="cursor-pointer" name="" id="" checked={doctor.available} onChange={() => setDrAvailability(doctor._id)} />
                                        <p className="text-sm cursor-pointer">Available</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}
export default DoctorsList