import { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios"
import { adminContext } from "./AdminContext";

export const doctorContext = createContext()
export function DoctorContextProvider({children}) {

    const [isDLoggedIn, setIsDLoggedIn] = useState(false)
    const [dLoading, setDLoading] = useState(true)
    const {backend_url} = useContext(adminContext)

    function ageCalculation(dob) {
        const year = dob.split("-")[0]
        const today = new Date()
        const todayYear = today.getFullYear()
        console.log(dob)
        return todayYear-year
    }

    async function checkLogin() {
            try {
                const {data} = await axios.get(backend_url+"/api/doctor/check-login", {withCredentials:true})
                if(data.success){
                    setIsDLoggedIn(true)
                }
            } catch (error) {
                console.log(error.message)
                setIsDLoggedIn(false)
            }finally{
                setDLoading(false)
            }
        }
        useEffect(()=>{checkLogin()},[])

    const values = {
        isDLoggedIn, setIsDLoggedIn,
        ageCalculation,
        dLoading
    }
    return<doctorContext.Provider value={values}>
        {children}
    </doctorContext.Provider>
}