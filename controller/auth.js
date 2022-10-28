const asyncWrapper = require('../middlewares/async');
const BADREQUEST = require('../errors/index')


const login = asyncWrapper((req,res) =>{
    return res.status().json({})
});


module.exports = {
    login,
}