const { Schema, model } = require('mongoose');

const { userStatus, userRole } = require('../configs');

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    born: {
        type: Date,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: Object.values(userStatus)
    },
    role: {
        type: String,
        enum: Object.values(userRole)
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false
    },
    is_login: {
        type: Boolean,
        default: false,
        required: true
    },
    avatar: {
        type: String
    }
}, {timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }});

module.exports = model('user', userSchema);

