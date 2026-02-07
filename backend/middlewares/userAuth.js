const {verify} = require("../middlewares/authentication")
async function checkUserLogin(req, res, next) {
    try {
        // const authHeader = req.headers.authorization
        // if (!authHeader) {
        //     return res.status(401).json({
        //         success: false,
        //         message: "Authorization header missing"
        //     })
        // }
        // const uToken = authHeader.split(" ")[1]
        // console.log("utoken in user auth middleware :",uToken)
        const uToken = req.cookies.uToken
        if(!uToken){
            return res.status(400).json({success: false, message:"Token not found. User not logged in!"})
        }
        const userId = verify (uToken)
        // console.log("user id in user auth: ",userId.data)
        req.userId = userId.data
        next()
    } catch (error) {
        return res.status(400).json({success: false, message:error.message})
    }
}


module.exports = {
    checkUserLogin
}