const { Schema, model } = require('mongoose');

const { userStatus, userRole } = require('../configs');

const userSchema = new Schema({
    user_name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    born: {
        type: String,
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
    total: {
        type: Number,
        default: 0,
        required: true,
        trim: true
    },
    avatar: {
        type: String
    }
}, {timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }});

module.exports = model('user', userSchema);

