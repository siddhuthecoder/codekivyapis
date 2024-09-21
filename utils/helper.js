const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const ErrorValidation = async (req,res,err,errtype) => {
    // console.log(errtype)
    if(errtype=='cache'){
        let msg = (err.message)?err.message:'Try again'
        return res.status(400).send({message:msg,error:err});
    }else{
        let message = null
        let errors  = []
        if(err.code && err.code==11000){
            if (err.keyPattern){
                for (const [key, value] of Object.entries(err.keyPattern)) {
                    errors.push(key)
                }
            }
            message = errors.join(", ")+' already existed'
        }else if(err.name && err.name=='ValidationError'){
            for (const [key, value] of Object.entries(err.errors)) {
                errors.push(value['message'])
            }
            message = errors.join(", ")
        }else{
            if(err.message){
                message = err.message
            }
        }
        return res.status(400).send({message:message,error:err});
    }
}

const commonExclude = () => {
    return ['password','isDeleted','createdAt','updatedAt']
  }

const SuccessValidation = async (req, res, doc, statusCode = null) => {
    let code;
    switch (req.method) {
        case 'POST':
            code = 201
            break;
        case 'DELETE':
            code = 204
            break;
        case 'GET':
            code = 200
            break;
        case 'PUT':
            code = 200
            break;
        case 'PATCH':
            code = 200
            break;
        default:
            code = 200
    }
    if(statusCode) code = statusCode;
    return res.status(code).send(doc);
}

const getJwtEncCode = async () => {
    return {
        code: 'abcdefg',
        expiresIn: '10000'
    }
}

const generateRefreshToken = (userId) => {
    const token = crypto.randomBytes(40).toString('hex') + userId;
    return token;
  };


function generateUnique10DigitNumber() {
    const timestamp = Date.now().toString(); // Current timestamp in milliseconds
    const randomBytes = crypto.randomBytes(3).toString('hex'); // Generate 6 random hex characters
    const uniqueString = timestamp + randomBytes;

    // Extract a 10-digit number from the combined string
    let number = '';
    for (let i = 0; i < uniqueString.length && number.length < 10; i++) {
        if (!isNaN(uniqueString[i])) {
            number += uniqueString[i];
        }
    }
    return number;
}


const helper = {};
helper.ErrorValidation = ErrorValidation;
helper.SuccessValidation = SuccessValidation;
helper.getJwtEncCode = getJwtEncCode;
helper.generateRefreshToken = generateRefreshToken;
helper.commonExclude = commonExclude;
helper.generateUnique10DigitNumber = generateUnique10DigitNumber;
module.exports = helper;