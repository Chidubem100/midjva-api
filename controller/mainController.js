const asyncWrapper = require('../middlewares/async');
const Details = require('../model/mainModel');


const getAllDetails = asyncWrapper(async(req,res) =>{
    // console.log(createdBy.req.userId)
    // const createdBy = createdBy:req.user.userId
    // const created = req.user.userId
    const details = await Details.find({}).sort('createdAt');
    return res.status(200).json({success:true, details})
})

const getDetail = async(req,res) =>{
    res.status(200).send("get detail route")
}

const createDetail = asyncWrapper(async(req,res) =>{
    
    const {email,description,F_name} = req.body

    if(!description||!F_name){
        return res.status(400).json({success:false, msg:"Please fill in the person'name and attach a description",});
    }

    if(!email){
        return res.status(400).json({success:false, msg:"Please fill in the Email"})
    }

    // if(!email||!F_name||!description){
    //     return res.status(400).json({success:false, msg:"Please fill in the Email, the person's name and add a description"})
    // }

    const detail = await Details.create(req.body);
    return res.status(201).json({success: true, detail})
});

const updateDetail = async(req,res) =>{
    res.status(200).send("update route")
}

const deleteDetail = async(req,res) =>{
    res.status(200).send("delete route")
}



module.exports = {
    getAllDetails,
    getDetail,
    createDetail,
    updateDetail,
    deleteDetail
}