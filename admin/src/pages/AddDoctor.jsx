import { useState } from "react"
import { assets } from "../assets/assets"
import axios from "axios"
import { useContext } from "react"
import { adminContext } from "../context/AdminContext"
import Loading from "../components/Loading"

function AddDoctor() {
    const { backend_url } = useContext(adminContext)
    const [loading, setLoading] = useState(false)

    const [image, setImage] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [experience, setExperience] = useState("1 Yearss")
    const [fee, setFee] = useState(0)
    const [speciality, setSpeciality] = useState("General physician")
    const [degree, setDegree] = useState("")
    const [address1, setAddress1] = useState("")
    const [address2, setAddress2] = useState("")
    const [about, setAbout] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        if (!image) {
            alert("Please select the image")
            return
        }
        const formData = new FormData()
        formData.append("image", image)
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("experience", experience)
        formData.append("fee", Number(fee))
        formData.append("speciality", speciality)
        formData.append("degree", degree)
        formData.append("address", JSON.stringify({ line1: address1, line2: address2 }))
        formData.append("about", about)
        console.log(formData)
        try {
            setLoading(true)
            const response = await axios.post(backend_url + "/api/admin/add-new-doctor", formData, { withCredentials: true })
            console.log("reponse is :", response)
            if (response.data.success) {
                setImage(false)
                setName("")
                setEmail("")
                setPassword("")
                setExperience("1 Yearss")
                setFee("")
                setSpeciality("General physician")
                setDegree("")
                setAddress1("")
                setAddress2("")
                setAbout("")
                alert(response.data.message)
            }
        } catch (error) {
            // alert(error)
            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
                alert(error.response.data.message || "Bad Request");
            }
        }finally{
            setLoading(false)
        }

    }

    return (
        <>
        {loading?<Loading actionName={"Adding Doctor..."}/>:""}
            <div>
                <p className="text-lg font-semibold my-5">Add Doctor</p>
                <form onSubmit={handleSubmit}>
                    <div className="flex items-center">
                        <label htmlFor="img" className="mb-2 cursor-pointer">
                            <img src={image !== false ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                        </label>
                        <input className="border border-gray-200 py-1 px-2 rounded-lg hidden w-60" type="file" id="img" onChange={(e) => setImage(e.target.files[0])} />
                        <p className="text-sm text-gray-600 ml-1">Upload doctor <br /> picture</p>
                    </div>

                    <div className="flex gap-10">
                        <div>
                            <div>
                                <p className="mb-1">Doctor name</p>
                                <input className="border border-gray-200 py-1 px-2 rounded-lg mb-1 w-60" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div>
                                <p className="mb-1">Doctor Email</p>
                                <input className="border border-gray-200 py-1 px-2 rounded-lg mb-1 w-60" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div>
                                <p className="mb-1">Set Password</p>
                                <input className="border border-gray-200 py-1 px-2 rounded-lg mb-1 w-60" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div>
                                <p className="mb-1">Experience</p>
                                <select name="" id="experience" value={experience} className="mb-1 w-60 py-1 px-2 border border-gray-200 rounded-lg" onChange={(e) => setExperience(e.target.value)}>
                                    <option value="1 Years">1 Years</option>
                                    <option value="2 Years">2 Years</option>
                                    <option value="3 Years">3 Years</option>
                                    <option value="4 Years">4 Years</option>
                                    <option value="5 Years">5 Years</option>
                                    <option value="6 Years">6 Years</option>
                                    <option value="7 Years">7 Years</option>
                                    <option value="8 Years">8 Years</option>
                                    <option value="9 Years">9 Years</option>
                                    <option value="10 Years">10 Years</option>
                                </select>
                            </div>
                            <div>
                                <p className="mb-1">Fee's</p>
                                <input className="border border-gray-200 py-1 px-2 rounded-lg mb-1 w-60" type="number" placeholder="Fee" value={fee} onChange={(e) => setFee(e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <div>
                                <p className="mb-1">Speciality</p>
                                <select name="" id="speciality" value={speciality} className="mb-1 w-60 py-1 px-2 border border-gray-200 rounded-lg" onChange={(e) => setSpeciality(e.target.value)}>
                                    <option value="General physician">General physician</option>
                                    <option value="Gynecologist">Gynecologist</option>
                                    <option value="Dermatologist">Dermatologist</option>
                                    <option value="Pediatricians">Pediatricians</option>
                                    <option value="Neurologist">Neurologist</option>
                                    <option value="Gastroenterologist">Gastroenterologist</option>
                                </select>
                            </div>
                            <div>
                                <p className="mb-1">Degree</p>
                                <input className="border border-gray-200 py-1 px-2 rounded-lg mb-1 w-60" type="text" placeholder="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} />
                            </div>
                            <div>
                                <p className="mb-1">Address</p>
                                <input className="border border-gray-200 py-1 px-2 rounded-lg mb-1 w-60" type="text" placeholder="Address 1" value={address1} onChange={(e) => setAddress1(e.target.value)} />
                                <br />
                                <input className="border border-gray-200 py-1 px-2 rounded-lg mb-1 w-60" type="text" placeholder="Address 2" value={address2} onChange={(e) => setAddress2(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="mb-1">About Doctor</p>
                        <textarea className="border border-gray-200 py-1 px-2 rounded-lg mb-1 w-130 h-20" placeholder="write about doctor" value={about} onChange={(e) => setAbout(e.target.value)} />
                    </div>
                    <button className="py-1 px-5 bg-primary rounded-full text-white cursor-pointer my-7">Add Doctor</button>
                </form>
            </div>
        </>
    )
}
export default AddDoctor