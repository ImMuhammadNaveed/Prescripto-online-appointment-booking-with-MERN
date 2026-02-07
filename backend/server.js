const express = require("express")
require("dotenv").config()
const app = express()
const{connectToCloudinary} = require("./middlewares/cloudinary")
const{connectToDB} = require("./database/connectToDB")
const cookieParser = require("cookie-parser")
const cors = require("cors") 
const {userRouter} = require("./router/userRouter")
const {adminRouter} = require("./router/adminRoutes")
const {doctorRouter} = require("./router/doctorRoutes")

connectToDB()
connectToCloudinary()
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"]
app.use(cors({origin: allowedOrigins, credentials:true}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res)=>{res.send("Server started")})
app.use("/api/admin", adminRouter)
app.use("/api/user", userRouter)
app.use("/api/doctor", doctorRouter)


app.listen(process.env.port, ()=>{console.log("Server started!")})