import { useEffect, useState } from "react";
import { createContext } from "react";
export const userContext = createContext()
import axios from "axios"

export function UserContextProvider({children}){
    // const token = localStorage.getItem("uToken")
    // const [uToken, setUToken] = useState(token && token!=="null" && token!=="undefined" ? token:"")
    // const [uToken, setUToken] = useState(localStorage.getItem("uToken")?localStorage.getItem("uToken"):"")
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState(false)
    const [allDoctors, setAllDoctors] = useState([])
    const backend_url = import.meta.env.VITE_BACKEND_URL

    
    async function getAllDoctor() {
        try {
            const {data} = await axios.get(backend_url+"/api/user/all-doctors", {withCredentials:true})
            if(data.success){
                setAllDoctors(data.doctors)
            }
        } catch (error) {
            if(error.response){
                console.log("error response: ", error.response.data.message)
            }else{
                console.log(error.message)
            }
        }
    }
    useEffect(()=>{
        getAllDoctor()
        // console.log(allDoctors)
    },[])
    async function getUserData() {
        try {
            setLoading(true)
            const {data} = await axios.get(backend_url+"/api/user/get-profile", {withCredentials:true})
            // console.log(data)
            if(data.success){
                setUserData(data.userData)
                // console.log("user data is: ",userData)
                setIsLoggedIn(true)
            }
        } catch (error) {
            if(error.response){
                console.log(error.response.data.message)
            }else{
                console.log(error.message)
            }
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{getUserData()},[])

    const values={
        backend_url,
        // uToken, setUToken,
        isLoggedIn, setIsLoggedIn,
        loading,
        userData, setUserData,
        getUserData,
        allDoctors
    }

    return <userContext.Provider value={values}>
        {children}
    </userContext.Provider>
}

