const mongoose = require('mongoose')

const userDetailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    location: {
        type: String,
    },
    age:{
        type: Number,
    },
    workDetails:{
        type: String,
    }
})

const UserDetailsModel = mongoose.model('UserDeatils',userDetailsSchema)

module.exports = UserDetailsModel