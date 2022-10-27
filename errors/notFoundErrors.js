const customError = require('./customError');

class notFoundError extends customError{
    constructor(message){
        super(message);
        this.statusCode = 401
    }
}


module.exports = notFoundError