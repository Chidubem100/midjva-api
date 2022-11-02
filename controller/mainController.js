const asyncWrapper = require('../middlewares/async')

const getAllDetails = async(req,res) =>{
    res.status(200).send("get all route")
}

const getDetail = async(req,res) =>{
    res.status(200).send("get detail route")
}

const createDetail = async(req,res) =>{
    res.status(201).send("create detail")
}

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