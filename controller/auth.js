const asyncWrapper = require('../middlewares/async');
const User = require('../model/userModel');
const BADREQUEST = require('../errors/index');


const register =  asyncWrapper(async(req,res) =>{
    const {email,firstName,lastName} = req.body

    const signUp = await User.create({ ...req.body })
});

const login = asyncWrapper((req,res) =>{
    return res.status(200).json({msg:'login route'})
});


module.exports = {
    login,
    register
}