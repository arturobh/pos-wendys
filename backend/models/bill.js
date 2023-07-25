const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const billSchema = new Schema({
    orderId : {
        type: String,
        required: true
    },
    billDate : {
        type: Date,
        required: true
    },
    subTotal : {
        type: Number,
        required: true
    },
    iva : {
        type: Number,
        required: true
    },
    total : {
        type: Number,
        required: true
    },
    hasTip : {
        type: Boolean,
        required: true
    },
    tip : {
        type: Number,
        required: false
    },
    grandTotal : {
        type: Number,
        required: true
    },
    paymentDetail : [
        {
            type : {
                type: String,
                required: true
            },
            amount : {
                type: Number,
                required: true
            },
            change : {
                type: Number,
                required: false
            },
            _id: false
        },
        {
            validate: {
            validator: function (v) { 
                return v && v.length > 0; 
            }
        },
        required: true,
        }
    ]
});


module.exports = model('Bill', billSchema);