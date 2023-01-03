const asyncWrapper = require('../middlewares/async');
const Details = require('../model/mainModel');


const getAllDetails = asyncWrapper(async(req,res) =>{
    // filter functionality
    // pagination
    // sort functionality
    // search functionality

    const {sort,fields,email,description,F_name} = req.query;

    const queryObjects = {createdBy:req.user.userId}

    console.log(req.query)
    
    if(email){
        queryObjects.email = { $regex: email, $options: 'i' }
    }
    if(description){
        queryObjects.description = { $regex: description, $options: 'i' }
    }
    if(F_name){
        queryObjects.F_name = {$regex: F_name, $options: 'i'}
    }

    let results =  Details.find(queryObjects)

    if(sort === 'latest'){
        results = results.sort('-createdAt')
    }
    if(sort === 'oldest'){
        results = results.sort('createdAt')
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ');
        results = results.select(fieldsList)
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    results = results.skip(skip).limit(limit);

    const totalDetails = await Details.countDocuments(req.query);
    const numOfPages = Math.ceil(totalDetails/limit) 

    const details = await results
    return res.status(200).json({success:true, nbOfHits:details.length, totalDetails,numOfPages,details})
});

const getDetail = asyncWrapper(async(req,res)=>{

    const {
        user: {userId},  
        params:{id: detailId}
    } = req

    const detail = await Details.findOne({_id: detailId,createdBy: userId,});

    if(!detail){
        return res.status(400).json({success:false,msg:"Detail doesn't exist"})
    }
    return res.status(200).json({success:true, detail})
});

const createDetail = asyncWrapper(async(req,res) =>{
    
    req.body.createdBy = req.user.userId

    const {email,description} = req.body

    if(!description||!email){
        return res.status(400).json({success:false, msg:"Please fill in the person's email and attach a description",});
    }

    const detail = await Details.create(req.body);
    return res.status(201).json({success: true, detail})
});

const updateDetail = asyncWrapper(async(req,res) =>{
    //destructure the req
    const {
        user:{userId}, 
        params:{id:detailId}, 
        body:{email,description}
    } = req

    if(!email||!description){
        return res.status(400).json({success: false, msg:"Please fill in the Email and Description Field"})
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
    const{
        params:{id:detailId}, 
        user:{userId}
    } = req

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