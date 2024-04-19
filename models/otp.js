const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:'User'
    },
    user_email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    timestamp:{
        type:Date,
        default:Date.now,
        required:true,
        get: (timestamp) => timestamp.getTime(),
        set: (timestamp) => new Date(timestamp) 
    }

})

const OtpModel = mongoose.model('Otp',otpSchema)

module.exports = OtpModel