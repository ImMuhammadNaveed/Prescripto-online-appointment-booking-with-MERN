const jwt = require("jsonwebtoken")
require("dotenv").config()

function sign(data) {
    const token = jwt.sign({data}, process.env.JWT_SECRET)
    return token
}
function verify (token){
    const data = jwt.verify(token, process.env.JWT_SECRET)
    return data
}
module.exports={
    sign, verify
}