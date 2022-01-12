const { Schema, model } = require('mongoose');

const { userStatus, userRole } = require('../configs');

const userSchema = new Schema({
    name: {
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
        default: userRole.USER,
        enum: Object.values(userRole)
    },
    email: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        select: false
    },
    total: {
        type: Number,
        default: 0,
        required: true,
        trim: true
    },
    avatar: {
        type: String
    },
    family_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'family'
    }
}, {timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }});

module.exports = model('user', userSchema);

