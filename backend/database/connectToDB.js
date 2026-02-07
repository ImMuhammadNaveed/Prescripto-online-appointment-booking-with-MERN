const mongoose = require("mongoose")
require("dotenv").config()

function connectToDB() {
    mongoose.connect(process.env.DATABASE_URL).then(()=>{console.log("Database connected")})
}

module.exports={
    connectToDB
}