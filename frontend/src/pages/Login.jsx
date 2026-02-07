import { useState, useEffect } from "react"
import axios from "axios"
import { useContext } from "react"
import { userContext } from "../context/Context"
import { useNavigate } from "react-router-dom"
import Loading from '../components/Loading'

function Login() {
    const [account, setAccount] = useState("Sign up")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginLoading, setLoginLoading] = useState(false)
    const [registerLoading, setRegisterLoading] = useState(false)
    const navigate = useNavigate()

    const {backend_url, setIsLoggedIn, getUserData} = useContext(userContext)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setRegisterLoading(true)
            if(account === "Sign up"){
                const response = await axios.post(backend_url+"/api/user/register", {name, email, password}, {withCredentials:true})
                if(response.data.success){
                    // setUToken(document.cookie.split("=")[1])
                    // localStorage.setItem("uToken", document.cookie.split("=")[1])
                    setIsLoggedIn(true)
                    await getUserData()
                    navigate("/")
                }
                alert(response.data.message)
            }else{
                setLoginLoading(true)
                const response = await axios.post(backend_url+"/api/user/login", {email, password}, {withCredentials:true})
                if(response.data.success){
                    // setUToken(document.cookie.split("=")[1])
                    // localStorage.setItem("uToken", document.cookie.split("=")[1])
                    setIsLoggedIn(true)
                    await getUserData()
                    navigate("/")
                }
                alert(response.data.message)
            }
        } catch (error) {
            if(error.response){
                alert(error.response.data.message)
            }else{
                alert(error.message)
            }
        }finally{
            setLoginLoading(false)
            setRegisterLoading(false)
        }
    }
    useEffect(()=>{
            window.scrollTo({top:0, behavior:"smooth"})
        }, [])
    return (
        <>
        {loginLoading?<Loading actionName={"Checking Credentials..."}/>:""}
        {registerLoading?<Loading actionName={"Registering User..."}/>:""}
            <div className="flex flex-col gap-2 w-90 border border-gray-200 rounded-lg m-auto p-7 mt-5">
                <p className="text-3xl font-semibold text-gray-600">{account === "Sign up" ? "Create Account" : "Login"}</p>
                <p className="text-sm text-gray-600">Please {account} to book appointment</p>
                <form onSubmit={(e)=>handleSubmit(e)}>
                    {
                        account === "Sign up"
                            ? <div className="flex flex-col my-2">
                                <label htmlFor="name" className="text-gray-600 text-sm mb-2">Fullname</label>
                                <input 
                                    type="text" 
                                    id="name" 
                                    className="border w-full border-gray-300 rounded-md h-9" 
                                    value={name}
                                    onChange={(e)=>{setName(e.target.value)}}
                                />
                            </div>
                            : ""
                    }
                    <div className="flex flex-col my-2">
                        <label htmlFor="email" className="text-gray-600 text-sm my-2">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="border border-gray-300 rounded-md h-9" 
                            value={email}
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="password" className="text-gray-600 text-sm my-2">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="border border-gray-300 rounded-md h-9" 
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <button className="border w-full text-center bg-primary text-white py-2 rounded-lg mt-3">
                        {account === "Sign up" ? "Create account" : "Login"}
                    </button>
                    {
                        account === "Sign up"
                            ? <p className="text-gray-600 text-sm mt-4">Already have an account? <span className="cursor-pointer text-primary" onClick={()=>setAccount("Login")}>Login here</span></p>
                            : <p className="text-gray-600 text-sm mt-4">Create a new account? <span className="cursor-pointer text-primary" onClick={()=>setAccount("Sign up")}>Click here</span></p>
                    }
                </form>
            </div>


        </>

    )
}
export default Login