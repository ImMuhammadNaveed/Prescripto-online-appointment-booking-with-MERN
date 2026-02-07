import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";

export const adminContext = createContext()
export function AdminContextProvider({children}) {
    const backend_url = import.meta.env.VITE_BACKEND_URL
    const [isALoggedIn, setIsALoggedIn] = useState(false)
    const [allDoctors, setAllDoctors] = useState(false)
    const [aLoading, setALoading] = useState(true)

    async function getAllDoctors() {
        try {
            const response = await axios.get(backend_url+"/api/admin/all-doctors", {withCredentials: true})
            if (response.data.success){
                setAllDoctors(response.data.doctors)
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }
    useEffect(()=>{getAllDoctors()},[])
    async function checkLogin() {
    try {
        const { data } = await axios.get(backend_url + "/api/admin/check-login",{ withCredentials: true })
        if (data.success) {
            setIsALoggedIn(true)
        } else {
            setIsALoggedIn(false)
        }
    } catch (error) {
        setIsALoggedIn(false)
        console.log(error.response?.data?.message || error.message)
    }finally{
        setALoading(false)
    }
}

useEffect(() => {
    checkLogin()
}, [])

    let values={
        backend_url,
        isALoggedIn, setIsALoggedIn,
        allDoctors, setAllDoctors,
        getAllDoctors,
        aLoading
    }
    return <adminContext.Provider value={values}>
        {children}
    </adminContext.Provider>
}
