const express = require("express")
const doctorRouter = express.Router()
const {checkDoctorLogin} = require("../middlewares/doctorAuth")

const {login, doctorDashboard, completeAppointment, updateDoctorProfile, getProfile, cancelAppointment, doctorAppointments, logout, isLoggedIn} = require("../controllers/doctorControllers")
doctorRouter.post("/login", login)
doctorRouter.get("/dashboard", checkDoctorLogin, doctorDashboard)
doctorRouter.post("/complete-appointment", checkDoctorLogin, completeAppointment)
doctorRouter.post("/update-profile", checkDoctorLogin, updateDoctorProfile)
doctorRouter.get("/get-profile", checkDoctorLogin, getProfile)
doctorRouter.post("/cancel-appointment", checkDoctorLogin, cancelAppointment)
doctorRouter.get("/appointments", checkDoctorLogin, doctorAppointments)
doctorRouter.post("/logout", checkDoctorLogin, logout)
doctorRouter.get("/check-login", checkDoctorLogin, isLoggedIn)

module.exports = {
    doctorRouter
}