const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const categorySchema = new Schema({
    _id: mongoose.ObjectId,
    categoryName: {
        type: String,
        required : true
    },
    products : [
        {
            id: {
             type: String,
             required: true
         },
         productName : {
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
    }
    ]
})

module.exports = model('Category', categorySchema);