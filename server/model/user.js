const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    name: String,
    age: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('users', userSchema);