const express = require("express")
const userRouter = express.Router()
const {checkUserLogin} = require("../middlewares/userAuth")
const {upload} = require("../middlewares/multer")
const {register, login, getProfile, allDoctors, updateProfile, bookAppointment, myAppointments, cancelAppointment, logout, isLoggedIn} = require("../controllers/userContollers") 

userRouter.post("/register", register)
userRouter.post("/login", login)
userRouter.get("/get-profile", checkUserLogin, getProfile)
userRouter.get("/all-doctors", allDoctors)
userRouter.post("/update-profile", checkUserLogin, upload.single("image"), updateProfile)
userRouter.post("/book-appointment", checkUserLogin, bookAppointment)
userRouter.get("/my-appointments", checkUserLogin, myAppointments)
userRouter.post("/cancel-appointment", checkUserLogin, cancelAppointment)
userRouter.post("/logout", checkUserLogin, logout)
userRouter.get("/check-login", checkUserLogin, isLoggedIn)

module.exports = {
    userRouter
}