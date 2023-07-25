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
    img : {
        type: String, 
        required : true
    }
})

module.exports = model('Ingredient', igredientSchema);