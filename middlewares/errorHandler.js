const {CustomError} = require('../errors/customError')

const errorHandlerMiddleware = (err,req,res,next)=>{
    let customError = {
        statusCode: err.statusCode ||   500,
        msg: err.message || "Something went wrong!!",
        // console.log()
    }
    
    if(err.name === 'ValidationError'){
        customError.msg = Object.values(err.errors)
        .map((items)=>items.message)
        .join(',')
        customError.statusCode = 400
    }

    if(err.code && err.code === 11000){
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please provide another email`,
        customError.statusCode = 400
    }
    
    if(err.name === 'CastError'){
        customError.msg = `No item found with item id`
        customError.statusCode = 404
    }


    return res.status(customError.statusCode).json({msg: customError.msg})
}

module.exports = errorHandlerMiddleware