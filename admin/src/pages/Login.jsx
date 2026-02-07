import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { adminContext } from "../context/AdminContext"
import { doctorContext } from "../context/DoctorContext"
import Loading from "../components/Loading"

function Login() {
    const [state, setState] = useState("Admin")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {backend_url, setIsALoggedIn} = useContext(adminContext)
    const {setIsDLoggedIn} = useContext(doctorContext)
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        // console.log(backend_url)
        if(state==="Admin"){
            try {
                setLoading(true)
                const {data} = await axios.post(backend_url+"/api/admin/login", {email, password}, {withCredentials:true})
                if(data.success){
                    setIsALoggedIn(true)
                    alert(data.message)
                }
            } catch (error) {
                console.log(error.message)
            }finally{
                setLoading(false)
            }
        }else{
            try {
                setLoading(true)
                const {data} = await axios.post(backend_url+"/api/doctor/login",{email:email, password:password}, {withCredentials:true})
                if(data.success){
                    setIsDLoggedIn(true)
                    alert(data.message)
                }
            } catch (error) {
                alert(error.response.data.message)
            }finally{
                setLoading(false)
            }
        }
        
    }
    return (
        <>
        {loading?<Loading actionName={"Checking Credentials..."}/>:""}
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="w-80 border border-gray-200 rounded-lg p-5 mt-40">
                    <p className="text-3xl font-semibold flex justify-center"><span className="text-primary mr-2">{state}</span><p className="text-gray-600">Login</p></p>
                    <div>
                        <p className="text-sm text-gray-600 my-1">Email</p>
                        <input
                            type="email"
                            required
                            className="w-full border border-gray-300 rounded-lg p-1"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 my-1">Password</p>
                        <input
                            type="password"
                            required
                            className="w-full border border-gray-300 rounded-lg p-1"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 mt-4 p-1 rounded-lg text-white font-semibold">Login</button>
                    {
                        state === "Admin"
                            ? <p className="text-sm text-gray-600 mt-2">Doctor Login? <span onClick={() => setState("Doctor")} className="text-blue-500 cursor-pointer">Click here</span></p>
                            : <p className="text-sm text-gray-600 mt-2">Admin Login? <span onClick={() => setState("Admin")} className="text-blue-500 cursor-pointer">Click here</span></p>
                    }
                </form>
            </div>
        </>
    )
}
export default Login