const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    name: {
        type: String,
        required: true,
        trim: true
    }, 
    age: {
        type: Number,
        validate(value) {
            if (value<0) {
                throw new Error('Age must be a positive number')
            }
        },
        default: 0
    },
    email: {
        type: String,
        require: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        },
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error ('Password can\'t include word password, dummy!')
            }
        },
        trim: true
    }
})

module.exports = User