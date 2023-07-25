const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const cashierSchema = new Schema({
    name : {
        type: String,
        required : true
    },
    lastName : {
        type: String,
        required : true
    }
});


module.exports = model('Cashier', cashierSchema);