const express = require("express")
const adminRouter = express.Router()
const {addDoctor, adminLogin, allDoctors, setDoctorAvailability, adminDashboard, cancelAppointment, logout, isLoggedIn, completeAppointment, allAppointments} = require("../controllers/adminControllers") 
const {upload} = require("../middlewares/multer")
const {checkAdminLogin} = require("../middlewares/adminAuth")

adminRouter.post("/add-new-doctor", upload.single("image"), checkAdminLogin, addDoctor)
adminRouter.post("/login", adminLogin)
adminRouter.get("/all-doctors", checkAdminLogin, allDoctors)
adminRouter.post("/set-dr-availability", checkAdminLogin, setDoctorAvailability)
adminRouter.get("/dashboard", checkAdminLogin, adminDashboard)
adminRouter.post("/cancel-appointment", checkAdminLogin, cancelAppointment)
adminRouter.post("/logout", checkAdminLogin, logout)
adminRouter.get("/check-login", checkAdminLogin, isLoggedIn)
adminRouter.post("/complete-appointment", checkAdminLogin, completeAppointment)
adminRouter.get("/all-appointments", checkAdminLogin, allAppointments)

module.exports={
    adminRouter
}