const {verify} = require("../middlewares/authentication")
require("dotenv").config()
function checkAdminLogin(req, res, next) {
    // const authHeaders = req.headers.authrization
    // if(!authHeaders){
    //     return res.status(400).json({success: false, message:"Authorization headers missing!"})
    // }
    // const token = authHeaders.split(" ")[1]
    const token = req.cookies.aToken
    if(!token){
        return res.status(400).json({success: false, message:"Token not found! admin is not logged in!"})
    }
    const data = verify(token)
    // console.log(data.data)
    if(data.data!== process.env.ADMIN_USERNAME+" "+process.env.ADMIN_PASSWORD){
        return res.status(400).json({success:false, messsage:"Not authorized! login again"})
    }
    req.adminData = data
    next()
    
}
module.exports={
    checkAdminLogin
}