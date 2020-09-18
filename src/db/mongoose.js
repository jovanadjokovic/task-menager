const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect('mongodb://127.0.0.1:27017/task-menager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
})

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

const Task = mongoose.model('Task', {
    description: {
        type: String, 
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const task = new Task({
    completed: true
})
task.save().then(() => {
    console.log(task)
}).catch((error) => {
    console.log('Error ',error)
})


// const me = new User({ 
//     name: 'Soja',
//     email: 'soja@gmail.com        ',
//     password: 'nikolicaprikolica   '
// })

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log('Error ',error)
// })