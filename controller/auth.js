const asyncWrapper = require('../middlewares/async');
const User = require('../model/userModel');
const {BadRequestError} = require('../errors/index');


// FOR SIGN UP
const register =  asyncWrapper(async(req,res) =>{
    const {email,fullName,userName,password} = req.body
    if(!email||!fullName||!userName||!password){
        throw new BadRequestError('Please provide valid credentials.')
    }
    const user = await User.create({ ...req.body });
    const token = user.createJwt();
    return res.status(201).json({msg: 'User registered successfully!', user:{userName: user.getUserName()}, token})
});


//  FOR LOGIN
const login = asyncWrapper(async(req,res) =>{
    const {email, password} = req.body

    if(!email||!password){
        throw new BadRequestError('Please provide Your details')
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(401).json({success:false,msg:"Please provide valid details"})
    }
    const checkPassword = await user.comparePassword(password)
    if(!checkPassword){
        return res.status(400).json({success:false, msg: "Please provide a valid password"})
    }
    const token = user.createJwt()
    res.status(200).json({success: true, user:{userName: user.getUserName()},token})
});


module.exports = {
    login,
    register
}