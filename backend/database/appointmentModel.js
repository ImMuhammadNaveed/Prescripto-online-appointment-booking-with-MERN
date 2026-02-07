const mongoose = require("mongoose")
const appointmentSchema = mongoose.Schema({
    userId:{type: String, required:true},
    docId:{type: String, required:true},
    slotDate:{type: String, required:true},
    slotTime:{type: String, required:true},
    userData:{type: Object, required:true},
    amount:{type: Number, required:true},
    doctorData:{type: Object, required:true},
    date:{type: Number, required:true},
    cancelAppointment:{type: Boolean, default:false},
    payment:{type: Boolean, default:false},
    isCompleted:{type: Boolean, default:false},
})
const appointmentModel = new mongoose.model("appointment", appointmentSchema)

module.exports={
    appointmentModel
}