const { Schema, model } = require('mongoose');

const oAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true,
        trim: true
    },
    refresh_token: {
        type: String,
        required: true,
        trim: true
    },
    family_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'family'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('o_auth', oAuthSchema);
