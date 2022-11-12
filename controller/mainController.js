const asyncWrapper = require('../middlewares/async');
const Details = require('../model/mainModel');


const getAllDetails = asyncWrapper(async(req,res) =>{
    const details = await Details.find({createdBy:req.user.userId}).sort('createdAt');
    return res.status(200).json({success:true, details})
})

const getDetail = asyncWrapper(async(req,res)=>{

    const {user: {userId},  params:{id: detailId}} = req    
    const detail = await Details.findOne({_id: detailId,createdBy: userId,});

    // const detail = await Details.findById(req.params.id)

    if(!detail){
        return res.status(400).json({success:false,msg:"Detail doesn't exist"})
    }
    return res.status(200).json({success:true, detail})
});

const createDetail = asyncWrapper(async(req,res) =>{
    
    req.body.createdBy = req.user.userId

    const {email,description,F_name} = req.body

    if(!description||!F_name){
        return res.status(400).json({success:false, msg:"Please fill in the person's name and attach a description",});
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

const updateDetail = asyncWrapper(async(req,res) =>{
    const {user:{userId}, params:{id:detailId}, body:{email,description,F_name}} = req
    if(!email||!description||!F_name){
        return res.status(400).json({success: false, msg:"Please fill in the Email, Description and Name Field"})
    }
    const detail = await Details.findByIdAndUpdate({_id:detailId, createdBy:userId},req.body,{
        runValidators: true,
        new: true
    });
    if(!detail){
        return res.status(400).json({success:false,msg:"Detail doesn't exist"})
    }
    return res.status(200).json({success:true, msg: "Details updated successfully", detail})
});

const deleteDetail = asyncWrapper(async(req,res)=>{
    const{params:{id:detailId}, user:{userId}} = req
    const detail = await Details.findByIdAndDelete({_id:detailId,createdBy:userId})
    if(!detail){
        return res.status(400).json({success:false,msg:"Detail doesn't exist"})
    }
    return res.status(200).json({success:true, msg: "Detail deleted successfully"})
});



module.exports = {
    getAllDetails,
    getDetail,
    createDetail,
    updateDetail,
    deleteDetail
}