const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const orderSchema = new Schema({
    orderNumber: {
        type: Number,
        min: 0,
        max: 99,
        required : true
    },
    cashierName : {
        type: String,
        required : true
    },
    clientName : {
        type: String,
        required : true
    },
    orderDate : {
        type: Date,
        required : true
    },
    comments : {
        type: String,
        required : false
    },
    detail : {
        orderItems :[
            {
                itemId : {
                    type: String, 
                    required : true
                },
                itemDescription : {
                    type: String, 
                    required : true
                },
                itemUnitPrice : {
                    type: String, 
                    required : true
                },
                quantity : {
                    type: Number, 
                    required : true
                },
                subTotal : {
                    type: Number, 
                    required : true
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
                        extras : [
                            {
                                name: {
                                    type: String,
                                    required: true
                                },
                                name: {
                                    type: Number,
                                    required: true
                                },
                                _id: false
                            },
                            {
                                required: false
                            }],
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
        totalPrice : {
            type: Number,
            required: true
        }
    }
});


module.exports = model('Order', orderSchema);