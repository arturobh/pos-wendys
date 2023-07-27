const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const igredientSchema = new Schema({
    name : {
        type: String, 
        required : true
    },
    unit : {
        type: String, 
        required : true
    },
    imagePath : {
        type: String, 
        required : true
    },
    extraPrice : {
        type: Number,
        required : false
    },
    isExtra : {
        type: Boolean,
        required : true
    }
})

module.exports = model('Ingredient', igredientSchema);