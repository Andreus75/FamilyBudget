const { Schema, model } = require('mongoose');

const { transactionCategoryEnum, transactionKindEnum } = require('../configs');

const transactionSchema = new Schema({
    sum: {
        type: Number,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: Object.values(transactionCategoryEnum)
    },
    kind: {
        type: String,
        enum: Object.values(transactionKindEnum)
    },
    user_name: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    family_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'family'
    }

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('transaction', transactionSchema);
