const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const itemSchema = new Schema({
    description : {
        type: String,
        required:true
    },
    products : [
        {
            productId : {
                type: String,
                required : true
            },
            productType : {
                type: String,
                required : true
            },
            productName : {
                type: String,
                required : true
            },
            productPrice : {
                type: Number,
                required : true
            },
            productSize : {
                type: String,
                required : true
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
        }],
    productsAmount : {
        type: Number,
        required:true
    },
    itemPrice : {
        type: Number,
        required:true
    }
});


module.exports = model('Item', itemSchema);