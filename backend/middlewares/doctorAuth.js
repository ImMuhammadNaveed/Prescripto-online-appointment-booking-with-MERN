const { verify } = require("./authentication")

async function checkDoctorLogin(req, res, next) {
    try {
        // const authHeaders = req.headers.authorization
        // if(!authHeaders){
        //     return res.status(400).json({success: false, message:"Authorization header missing"})
        // }
        // const dToken = authHeaders.split(" ")[1]
        // console.log("doctor login token :",dToken)
        const dToken = req.cookies.dToken
        if(!dToken){
            return res.status(400).json({success: false, message:"Token not found! doctor is not logged in!"})
        }
        const docId = verify(dToken).data
        req.docId = docId
        next()
    } catch (error) {
        return res.status(500).json({success: false, message:error.message})
    }
}




module.exports = {
    checkDoctorLogin
}