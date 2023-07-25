const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const productSchema = new Schema({
    type : {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    ingredients : [{
        name:{
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        unit: {
            type: String,
            required: true
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
    }]
});


module.exports = model('Product', productSchema);