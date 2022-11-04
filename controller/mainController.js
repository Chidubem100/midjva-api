const asyncWrapper = require('../middlewares/async');
const Details = require('../model/mainModel');


const getAllDetails = asyncWrapper(async(req,res) =>{
    const details = await Details.find({createdBy:req.user.userId}).sort('createdAt');
    return res.status(200).json({success:true, details})
})

const getDetail = asyncWrapper(async(req,res)=>{

    const {user: {userId},  params:{_id: detailId}    } = req    
    const detail = await Details.findOne({_id: detailId,createdBy: userId,});
    if(!detail){
        return res.status(400).json({success:false,msg:"Detail doesn't exist"})
    }
    return res.status(200).json({success:true, detail})
});

const createDetail = asyncWrapper(async(req,res) =>{
    
    req.body.createdBy = req.user.userId

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