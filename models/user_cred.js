const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    is_verified: {
        type:Number,
        default:0
    }
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel