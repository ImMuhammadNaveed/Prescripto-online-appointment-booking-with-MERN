const bcrypt = require("bcrypt")
const { json } = require("express")
const validator = require("validator")
const { cloudinary } = require('../middlewares/cloudinary')
const { doctorModel } = require("../database/doctorsModel")
const {userModel} = require("../database/usersModel")
const {appointmentModel} = require("../database/appointmentModel")
const { sign } = require("../middlewares/authentication")
require("dotenv").config()


async function addDoctor(req, res) {
    // console.log("body is: ", req.body)
    const { name, email, password, speciality, degree, experience, about, fee, address } = req.body
    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fee || !address) {
        return res.status(400).json({ success: false, message: "all fields are required" })
    }
    if (!validator.isEmail(email)) {
        return res.status(500).json({ success: false, message: "enter correct email" })
    }
    if (password.length < 8) {
        return res.status(400).json({ success: false, message: "password must be of 8 characters" })
    }
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)
        imageFile = req.file
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
        // console.log("imageupload: ", imageUpload)
        const imageUrl = imageUpload.secure_url
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fee,
            address: JSON.parse(address),
            date: Date.now(),
            image: imageUrl
        }
        console.log("new doctor full data :",doctorData)
        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()
        return res.status(200).json({ success: true, message: "New doctor added" })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

async function adminLogin(req, res) {
    try {
        const { email, password } = req.body
        console.log(req.body)
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Missing detials" })
        }
        if (email !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({ success: false, message: "Incorrect cridentials" })
        }
        const token = sign(email + " " + password)
        res.cookie("aToken", token)
        return res.status(200).json({ success: true, message: "Admin logged in successfully" })
    } catch (error) {
        return res.status(400).json({success: false, message:error.message})
    }

}

async function allDoctors(req, res) {
    try {
        const doctors = await doctorModel.find({}).select("-password")
        return res.status(200).json({ success: true, doctors: doctors})
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

async function setDoctorAvailability(req, res) {
    try {
        const {drId} = req.body
        console.log(drId)
        const dr = await doctorModel.findById(drId)
        console.log(dr)
        if(!dr){
            return res.status(400).json({success: false, message:"Dr not found!"})
        }
        const updatedDr = await doctorModel.findByIdAndUpdate(drId, {available:!dr.available}, {new:true})
        if(updatedDr){console.log("after update :",updatedDr)}
        return res.status(200).json({success: true, message:"Dr availbility successfully updated!"})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

async function adminDashboard(req, res) {
    try {
        console.log("admin dashboard triggered")
        const allDoctors = await doctorModel.find({})
        const doctorsLength = allDoctors.length
        const allUsers = await userModel.find({})
        const usersLenght = allUsers.length
        const allAppointments = await appointmentModel.find({})
        const appointmentsLength = allAppointments.length
        const appointments = allAppointments.slice(0, 5)
        const data = {
            "numberOfDoctors": doctorsLength,
            "numberOfUsers": usersLenght,
            "numberOfAppointments": appointmentsLength,
            "appointments" : appointments
        }
        return res.status(200).json({success: true, data: data})
        // console.log("doctors: ",doctorsLength, "users :",usersLenght, "appointments :", appointmentLength)
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

async function cancelAppointment(req, res) {
    try {
        const {appointmentId} = req.body
        console.log("appointment id :",appointmentId)
        const appointmentData = await appointmentModel.findByIdAndUpdate(appointmentId, {cancelAppointment: true})
        if(!appointmentData){
            return res.status(400).json({success: false, message:"appointment data not found"})
        }
        const docId = appointmentData.doctorData._id
        console.log("doc id :", docId)
        const appointmentDate = appointmentData.slotDate
        const slotTime = appointmentData.slotTime
        await doctorModel.findByIdAndUpdate(docId, {$pull:{[`slots_booked.${appointmentDate}`]: slotTime}})
        return res.status(200).json({success: true, message:"appointment cancelled"})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

async function logout(req, res) {
    try {
        console.log("admin logout triggered")
        res.clearCookie("aToken")
        return res.status(200).json({success: true, message: "admin successfully logged out!"})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

async function isLoggedIn(req, res) {
    try {
        return res.status(200).json({success: true, message:"admin is logged in!"})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

async function completeAppointment(req, res) {
    try {
        const { appointmentId } = req.body
        // const docId = req.docId
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData) {
            return res.status(400).json({ success: false, message: "appointment not found!" })
        }
        const updatedAppointment = await appointmentModel.findOneAndUpdate({ _id: appointmentId }, { isCompleted: true }, { new: true })
        // console.log(updatedAppointment)
        return res.status(200).json({ success: true, message: "appointment completed!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function allAppointments(req, res) {
    try {
        const data = await appointmentModel.find({})
        return res.status(200).json({success: true, data: data})
    } catch (error) {
        return res.status(500).json({success: false, message: error.message})
    }
}

module.exports = {
    addDoctor,
    adminLogin,
    allDoctors,
    setDoctorAvailability,
    adminDashboard,
    cancelAppointment,
    logout,
    isLoggedIn,
    completeAppointment,
    allAppointments
}