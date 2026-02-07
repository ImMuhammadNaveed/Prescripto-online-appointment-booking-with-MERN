const { doctorModel } = require("../database/doctorsModel")
const { appointmentModel } = require("../database/appointmentModel")
const bcrypt = require("bcrypt")
const { sign } = require("../middlewares/authentication")
const { userModel } = require("../database/usersModel")
const { set } = require("mongoose")

async function login(req, res) {
    try {
        const { email, password } = req.body
        // console.log(email, password)
        const doctorData = await doctorModel.findOne({ email: email })
        // console.log(doctorData)
        if (!doctorData) {
            return res.status(400).json({ success: false, message: "incorrect email" })
        }
        const matched = await bcrypt.compare(password, doctorData.password)
        console.log(matched)
        if (!matched) {
            return res.status(400).json({ success: false, message: "incorrect password" })
        }
        const dToken = sign(doctorData._id)
        res.cookie("dToken", dToken)
        return res.status(200).json({ success: true, message: "Doctor successfully logged in!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function doctorAppointments(req, res) {
    try {
        console.log("doctor appointments controller triggered")
        const docId = req.docId
        const appointments = await appointmentModel.find({})
        const doctorAppointments = appointments.filter((appointment) => appointment.doctorData._id == docId)
        return res.status(200).json({ success: true, data: doctorAppointments })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function completeAppointment(req, res) {
    try {
        const { appointmentId } = req.body
        const docId = req.docId
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData) {
            return res.status(400).json({ success: false, message: "appointment not found!" })
        }
        if (appointmentData.doctorData._id == docId) {
            await appointmentModel.findOneAndUpdate({ _id: appointmentId }, { isCompleted: true }, { new: true })
        }
        return res.status(200).json({ success: true, message: "appointment completed!" })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function doctorDashboard(req, res) {
    try {
        // console.log("doctor dashbaord triggered")
        const docId = req.docId
        let earning = 0
        const appointments = await appointmentModel.find({})
        const doctorAppointments = appointments.filter((appointment) => appointment.doctorData._id == docId)
        doctorAppointments.forEach((appointment) => {
            if (appointment.isCompleted) {
                earning += appointment.amount
            }
        })
        // console.log("This doctor appointments length :", doctorAppointments.length)
        const appointmentsLength = doctorAppointments.length

        let uniquePatients = new Set()
        doctorAppointments.forEach((appointment) => {
            uniquePatients.add(appointment.userData.email)
        })
        const patientsLength = uniquePatients.size
        // console.log(uniqueUsers)

        const latestAppointments = doctorAppointments.slice(0, 5)
        const data = {
            "earnings": earning,
            "numberOfAppointments": appointmentsLength,
            "numberOfPatients": patientsLength,
            "appointments": latestAppointments
        }
        return res.status(200).json({ success: true, data: data })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function updateDoctorProfile(req, res) {
    try {
        console.log("update doctor controller triggered")
        const docId = req.docId
        const { fee, address1, address2, available } = req.body
        console.log(req.body)
        if (
            fee === undefined || address1 === undefined || address2 === undefined || available === undefined) {
            return res.status(400).json({ success: false, message: "missing details" })
        }
        const updatedDoctor = await doctorModel.findByIdAndUpdate(docId, { fee: fee, "address.line1": address1, "address.line2": address2, available: available }, { new: true })
        if (!updatedDoctor) {
            return res.status(400).json({ success: false, message: "doctor data not found!" })
        }
        console.log(updatedDoctor)
        return res.status(200).json({success: true, message:"Doctor profile update successfully"})
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

async function getProfile(req, res) {
    try {
        console.log("doctor profole controller triggered")
        const docId = req.docId
        const doctor = await doctorModel.findById(docId).select("-password")
        if (!doctor) {
            return res.status(400).json({ success: false, message: "doctor data not found!" })
        }
        return res.status(200).json({success: true, data: doctor})
    } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
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
        res.clearCookie("dToken")
        return res.status(200).json({success:true, message:"doctor successfully logged out!"})
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
    login,
    doctorAppointments,
    doctorDashboard,
    completeAppointment,
    updateDoctorProfile,
    getProfile,
    cancelAppointment,
    logout,
    isLoggedIn
}