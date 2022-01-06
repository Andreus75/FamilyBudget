const { Schema, model } = require('mongoose');

const familySchema = new Schema({
    family_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        select: false
    },
    avatar: {
        type: String
    },
    is_login: {
        type: Boolean,
        default: false,
        required: true
    },
    is_active: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true }});

module.exports = model('family', familySchema);

