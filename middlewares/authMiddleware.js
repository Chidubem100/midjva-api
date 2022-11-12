const jwt = require('jsonwebtoken');




const auth = async(req,res,next) =>{
    const authHeader = req.headers.authorization
    // check for the authheader and if it starts with 'Bearer'
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({success:false, msg: "Authentication failed"})
    }
    const token = authHeader.split(' ')[1]
    // verify the token
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId: payload.userId, userName: payload.userName}
        next()
    } catch (error) {
        return res.status(401).json({success:false, msg: "Authentication failed"})       
    }
}


module.exports = auth;