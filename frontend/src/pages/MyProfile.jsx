import { assets } from "../assets/assets"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../context/Context"
import axios from "axios"
import Loading from "../components/Loading"
function MyProfile() {
    const { userData, setUserData, backend_url, getUserData, loading } = useContext(userContext)

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [])
    // const [email, setEmail] = useState(userData ? userData.email : "")
    // const [phone, setPhone] = useState(userData ? userData.phone : "")
    // const [address1, setAddress1] = useState(userData ? userData.address?.line1 : "")
    // const [address2, setAddress2] = useState(userData ? userData.address?.line2 : "")
    // const [gender, setGender] = useState(userData ? userData.gender : "")
    // const [dob, setDob] = useState(userData ? userData.DOB : "")

    const [edit, setEdit] = useState(false)
    const [image, setImage] = useState(null)
    const [saving, setSaving] = useState(false)


    async function handleUpdate() {
        const formdata = new FormData()
        formdata.append("email", userData.email)
        formdata.append("phone", userData.phone)
        formdata.append("gender", userData.gender)
        formdata.append("dob", userData.DOB)
        formdata.append("image", image)
        formdata.append("address", JSON.stringify({ line1: userData.address.line1, line2: userData.address.line2 }))
        try {
            setSaving(true)
            const { data } = await axios.post(backend_url + "/api/user/update-profile", formdata, { withCredentials: true })
            alert(data.message)
            if (data.success) {
                setEdit(false)
                await getUserData()
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert(error.message)
            }
        } finally {
            setSaving(false)
        }
    }
    if (loading) {
        return (<Loading actionName={"Loading profile..."}/>)
    }
    return userData && (
        <>

            {saving && (
                <Loading actionName={"Saving profile..."}/>
            )}

            <div className="w-[80%] m-auto">
                {edit
                    ? <div className="w-30">
                        <label htmlFor="image">
                            <img src={image ? URL.createObjectURL(image) : assets.image_upload} alt="" />
                            {/* <i class="fa-solid fa-upload fa-7x"></i> */}
                        </label>
                        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} hidden />
                    </div>
                    : <img className="w-30" src={userData.image} alt="" />
                }
                <p className="text-3xl mt-7 mb-3">{userData.name}</p>
                <hr className="w-[50%] text-gray-300" />
                <p className="mt-7 mb-3 text-gray-600 underline">CONTACT INFORMATION</p>
                <div className="w-[50%]">
                    <div className="flex justify-between w-[70%]">
                        <p className="text-sm">Email id: </p>
                        {
                            edit
                                ? <input type="email" className="text-left text-sm text-right border border-gray-300 w-45" required value={userData.email} onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))} />
                                : <p className="text-primary text-sm">{userData.email}</p>
                        }

                    </div>
                    <div className="flex justify-between w-[70%]">
                        <p className="text-sm">Phone: </p>
                        {
                            edit
                                ? <input type="text" className="text-right text-sm border border-gray-300 w-45" required value={userData.phone} onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} />
                                : <p className="text-primary text-sm">{userData.phone}</p>
                        }

                    </div>
                    <div className="flex justify-between w-[70%]">
                        <p className="text-sm">Address: </p>
                        {
                            edit
                                ? <><div className="flex flex-col">
                                    <input className="text-sm text-right border border-gray-300 w-45" type="text" required value={userData.address.line1} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} />

                                    <input className="text-sm text-right border border-gray-300 w-45" type="text" required value={userData.address.line2} onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} />
                                </div>
                                </>
                                : <><div className="flex flex-col text-right">
                                    <p className="text-gray-600 text-sm">{userData?.address?.line1}</p>

                                    <p className="text-gray-600 text-sm">{userData?.address?.line2}</p>
                                </div>
                                </>
                        }

                    </div>
                </div>
                <p className="text-gray-600 underline mt-7 mb-3">BASIC INFORMATION</p>
                <div className="w-[50%]">
                    <div className="flex justify-between w-[70%]">
                        <p className="text-sm">Gender: </p>
                        {
                            edit
                                ? <select value={userData.gender} className="text-sm border border-gray-300 w-45" onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} required>
                                    <option value="not selected" disabled>Select gender</option>
                                    <option value="Male" >Male</option>
                                    <option value="Female" >Female</option>
                                </select>
                                : <p className="text-gray-600 text-sm">{userData.gender}</p>
                        }

                    </div>
                    <div className="flex justify-between w-[70%]">
                        <p className="text-sm">Birthday: </p>
                        {
                            edit
                                ? <input type="date" required value={userData.DOB} className="text-sm border border-gray-300 w-45" onChange={(e) => setUserData(prev => ({ ...prev, DOB: e.target.value }))} />
                                : <p className="text-gray-600 text-sm">{userData.DOB}</p>
                        }
                    </div>
                </div>
                {
                    edit
                        ? <button className="border border-gray-300 rounded-full px-7 py-2 text-sm text-gray-600 mt-5 cursor-pointer" onClick={handleUpdate}>Save Info</button>
                        : <button className="border border-gray-300 rounded-full px-7 py-2 text-sm text-gray-600 mt-5 cursor-pointer" onClick={() => setEdit(true)}>Edit</button>
                }

            </div>
        </>
    )
}
export default MyProfile