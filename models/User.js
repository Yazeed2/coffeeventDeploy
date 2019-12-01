const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({

    name: {
        required: false,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String

    },
createdEvents:[]
}, {
    timestamps: true
})



const User = mongoose.model('user', userSchema)
module.exports = User
