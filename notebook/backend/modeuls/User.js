const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    username :{
        type :String,
        required : true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

// Check if the model is already defined before defining it
const User = mongoose.models.User || mongoose.model('User', userSchema);

module.exports = User;