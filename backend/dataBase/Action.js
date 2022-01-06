const { Schema, model } = require('mongoose');
const tokenEnum = require('../configs/token-type-enum');

const actionSchema = new Schema({
    token: {
        type: String,
        required: true,
        trim: true
    },

    type: {
        type: String,
        required: true,
        enum: Object.values(tokenEnum)
    },

    family_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'family'
    },
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('action', actionSchema);
