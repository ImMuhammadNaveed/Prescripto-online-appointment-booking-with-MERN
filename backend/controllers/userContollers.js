const validator = require("validator")
const bcrypt = require("bcrypt")
const { userModel } = require("../database/usersModel")
const {appointmentModel} = require("../database/appointmentModel")
const { sign } = require("../middlewares/authentication")
const { cloudinary } = require("../middlewares/cloudinary")
const { doctorModel } = require("../database/doctorsModel")

async function register(req, res) {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Missing details!" })
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Provide correct email!" })
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: "Provide strong password!" })
        }
        const passwordSalt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, passwordSalt)
        const userData = {
            name: name,
            email: email,
            password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()
        const uToken = sign(user._id)
        res.cookie("uToken", uToken)
        return res.status(200).json({ success: true, message: "User registered!" })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" })
        }
        console.log(user.password)
        const isCorrectPassword = await bcrypt.compare(password, user.password)
        console.log(isCorrectPassword)
        if (!isCorrectPassword) {
            return res.status(400).json({ success: false, message: "Incorrect password!" })
        }
        const uToken = sign(user._id)
        res.cookie("uToken", uToken)
        return res.status(200).json({ success: true, message: "User successfully logged in!" })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }

}

async function getProfile(req, res) {
    try {
        const userId = req.userId
        const user = await userModel.findById(userId).select("-password")
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found!" })
        }
        return res.status(200).json({ success: true, userData: user })
    } catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }
}

async function updateProfile(req, res) {
    try {
        const userId = req.userId
        const { name, phone, address, dob, gender } = req.body
        console.log(req.body)
        imageFile = req.file
        let imageUrl
        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" })
            imageUrl = imageUpload.secure_url
        }
        const userData = {
            name: name, phone: phone, address: JSON.parse(address), DOB: dob, gender: gender, image: imageUrl
        }
        // console.log("user data to be updated backend: ", userData)
        const user = await userModel.findByIdAndUpdate(userId, userData, { new: true })
        // console.log("updated user :", user)
        if (!user) {
            return res.status(500).json({ success: false, message: "user not found!" })
        }
        return res.status(200).json({ success: true, message: "Profile updated!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
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

async function bookAppointment(req, res) {
    try {
        // console.log("book appointment controller hitted")
        const userId = req.userId
        const {docId, slotDate, slotTime} = req.body
        // console.log(req.body)
        const docData = await doctorModel.findById(docId).select("-password")
        if(!docData){
            return res.status(500).json({success: false, message:"Doctor data not found!"})
        }
        if(!docData.available){
            return res.status(500).json({success: false, message:"Doctor not available!"})
        }
        const userData = await userModel.findById(userId).select("-password")
        // console.log(userData)
        if(!userData){
            return res.status(500).json({success: false, message:"User not found!"})
        }
        //copying doctor booked slots
        let slotsBooked = docData.slots_booked
        if(Array.isArray(slotsBooked)){
            slotsBooked = {}
        }
        //checking if the doctor booked slots contain new booking date
        if(slotsBooked[slotDate]){
            //if contain than check if the new booking datae also contain new booking time
            if(slotsBooked[slotDate].includes(slotTime)){
                return res.status(500).json({success: false, message:"slot is already booked!"})
            }else{
                slotsBooked[slotDate].push(slotTime)
            }
        }else{
            slotsBooked[slotDate] = []
            slotsBooked[slotDate].push(slotTime)
        }
        //as we are putting the doctor data into DB so we will first delete the already booked slots
        delete docData.slots_booked
        const appointment = {
            userId: userId,
            docId: docId,
            userData: userData,
            doctorData: docData,
            amount: docData.fee,
            slotTime: slotTime,
            slotDate: slotDate,
            date: Date.now()
        }
        console.log(appointment)
        const newAppointment = new appointmentModel(appointment)
        await newAppointment.save()
        const updateDoctor = await doctorModel.findByIdAndUpdate(docId, {slots_booked: slotsBooked}, {new: true})
        return res.status(200).json({success: true, message:"Slot booked!"})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

async function myAppointments(req, res) {
    try {
        const userId = req.userId
        const myAppointments = await appointmentModel.find({userId: userId})
        return res.status(200).json({success: true, myAppointments: myAppointments})
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
        res.clearCookie("uToken")
        return res.status(200).json({success:true, message:"user successfully logged out!"})
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

async function isLoggedIn(req, res) {
    try {
        return res.status(200).json({success: true, message:"admin is logged in!"})
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}

module.exports = {
    register,
    login,
    getProfile,
    allDoctors,
    updateProfile,
    bookAppointment,
    myAppointments,
    cancelAppointment,
    logout,
    isLoggedIn
}