import { useContext, useEffect, useState } from "react"
import { adminContext } from "../context/AdminContext"
import axios from "axios"
import Loading from "../components/Loading"

function Profile() {

    const { backend_url } = useContext(adminContext)
    const [loading, setLoading] = useState(false)
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [docData, setDocData] = useState({})
    const [edit, setEdit] = useState(false)

    const [fee, setFee] = useState(0)
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [available, setAvailability] = useState(false)

    async function getProfileData() {
        try {
            setLoading(true)
            const { data } = await axios.get(backend_url + "/api/doctor/get-profile", { withCredentials: true })
            if (data.success) {
                setDocData(data.data)
                // console.log(data.data)
            }
        } catch (error) {
            alert(error.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(() => { getProfileData() }, [])

    function handleEdit() {
        setFee(docData.fee || 0)
        setAddress1(docData.address?.line1 || "")
        setAddress2(docData.address?.line2 || "")
        setAvailability(docData.available || false)
        setEdit(true)
    }

    async function updateProfile() {
        const newData = {
            "fee":fee,
            "address1": address1,
            "address2": address2,
            "available": available
        }
        // console.log(data)
        try {
            setLoadingUpdate(true)
            const {data} = await axios.post(backend_url+"/api/doctor/update-profile", newData, {withCredentials:true})
            console.log(data)
            if(data.success){
                getProfileData()
                setEdit(false)
            }
            alert(data.message)
        } catch (error) {
            console.log(error)
        }finally{
            setLoadingUpdate(false)
        }
    }

    if(loading){
        return(
            <Loading actionName={"Profile loading..."}/>
        )
    }
    return docData && (
        <>
        {loadingUpdate?<Loading actionName={"Profile updating..."}/>:""}
            <div className="w-[60%]">
                <img className="bg-primary w-70 rounded-lg mb-10" src={docData.image} alt="" />
                <p className="text-3xl font-semibold text-gray-600">{docData.name}</p>
                <div className="flex items-center my-2 mb-3">
                    <p className="text-gray-600 text-sm">{docData.degree} - {docData.speciality}</p>
                    <p className="text-gray-600 text-xs ml-3">{docData.experience}</p>
                </div>
                
                <p className="font-semibold mb-1">About :</p>
                <p className="text-sm text-gray-600 w-[60%] mt-2 mb-4">{docData.about}</p>

                <p className="text-gray-600 flex font-semibold my-2">Appointment fee: {edit
                    ? <div className="text-black" >
                        $<input type="number" className="border border-gray-200 rounded-lg" value={fee} onChange={(e)=>{setFee(e.target.value)}}/>
                    </div>
                    : <p className="font-semibold text-black">${docData.fee}</p>
                }</p>
                <div className="flex">
                <p className="mr-4">Address: </p>{edit
                    ? <div className="flex flex-col text-sm">
                        <input type="text" className="border border-gray-200 rounded-lg" value={address1} onChange={(e)=>{setAddress1(e.target.value)}}/>
                        <input type="text" className="border border-gray-200 rounded-lg" value={address2} onChange={(e)=>{setAddress2(e.target.value)}}/>
                    </div>
                    : <div className="text-sm">
                        <p>{docData.address?.line1}</p>
                        <p>{docData.address?.line2}</p>
                    </div>
                }
                </div>
                <div className="my-2">
                <label htmlFor="">
                    {edit
                    ?<input type="checkbox" className="mr-1" checked={available} onChange={(e)=>{setAvailability(e.target.checked)}} />
                    :<input type="checkbox" className="mr-1" name="" id="" checked={docData.available} />
                    }
                    Available
                </label>
                </div>
                {edit
                    ? <button className="py-1 px-4 border border-gray-300 rounded-full cursor-pointer text my-5" onClick={updateProfile}>Save Info</button>
                    : <button className="py-1 px-4 border border-gray-300 rounded-full cursor-pointer text my-5" onClick={handleEdit}>Edit</button>
                }

            </div>
        </>
    )
}
export default Profile