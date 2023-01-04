const asyncWrapper = require('../middlewares/async');
const User = require('../model/userModel');
const {BadRequestError} = require('../errors/index');


// FOR SIGN UP
const register =  asyncWrapper(async(req,res) =>{
    const {email,fullName,password} = req.body
    if(!email||!fullName||!password){
        throw new BadRequestError('Please provide valid credentials.')
    }
    const user = await User.create({ ...req.body });
    const token = user.createJwt();
    return res.status(201).json({
        msg: 'User registered successfully!', 
        user:{
            userName: user.userName,
            email: user.email,
            fullName: user.fullName,
            company: user.company,
            token
        }, 
    })
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
    res.status(200).json({
        success: true, 
        
        user:{
            userName: user.userName,
            email: user.email,
            fullName: user.fullName,
            company: user.company,
            token
        }, 
        
    });
});

// for updating user's profile
const updateProfile = asyncWrapper(async(req,res) =>{
    const {email,fullName,userName,company} = req.body;

    // if(!email||!fullName || !userName || !company){
        // return res.status(400).json({success:false, msg:"Fields can't be empty"});
    // }
    console.log(req.user.userId)
    const profile = await User.findOne({_id:req.user.userId})

    profile.email = email,
    profile.fullName = fullName,
    profile.userName = userName,
    profile.company = company,

    await profile.save();
    const token = profile.createJwt();

    console.log(req.body);
    res.status(200).json({
        success:true, 
        profile:{
            email: profile.email,
            fullName: profile.fullName,
            userName: profile.userName,
            company: profile.company,
            token
        }
    });
    // res.send('updating profile route')
});

const allUser = asyncWrapper(async(req,res) =>{
    const users = await User.find({});
    return res.status(200).json({users})
    // console.log(users)
});


module.exports = {
    login,
    register,
    updateProfile,
    allUser
}