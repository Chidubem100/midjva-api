const asyncWrapper = require('../middlewares/async');
const User = require('../model/userModel');
const {BadRequestError} = require('../errors/index');



const register =  asyncWrapper(async(req,res) =>{
    const {email,firstName,lastName} = req.body
    if(!email||!firstName||!lastName||!password){
        throw BadRequestError('Please provide valid credentials.')
    }
    const user = await User.create({ ...req.body });
    const token = user.createJwt();
    return res.status(201).json({msg: 'User registered successfully!', user:{firstName: user.getfirsName()}, token})
});

const login = asyncWrapper((req,res) =>{
    return res.status(200).json({msg:'login route'})
});


module.exports = {
    login,
    register
}