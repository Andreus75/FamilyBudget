const { Schema, model } = require('mongoose');

const { transactionCategoryEnum, transactionKindEnum } = require('../configs');

const transactionSchema = new Schema({
    data: {
        type: String,
        required: true,
        trim: true
    },
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
    full_name_user: {
        type: String,
        required: true,
        trim: true
    },
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

module.exports = model('transaction', transactionSchema);
