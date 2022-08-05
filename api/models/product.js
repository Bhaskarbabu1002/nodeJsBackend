const mongoose = require('mongoose');
const validator = require('validator')
const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type:String,
            required:true,
            maxlength:[40,'Maxlenth is 40'],
            minlength:[4, 'Minlengh is 10'],
            validate:[validator.isAlpha,'Product name must only contain characters']},
    price: {type:Number,required:true},
    image: {type: String, required:true}
})

module.exports = mongoose.model('Product',productSchema)
// const BrandName = mongoose.Schema({
//     brandname:{
//         type:String,
//         required:true,
//     },
//     date:{
//         type:Date,
//         default:Date.now,
//     }
// })


// module.exports = mongoose.model('brandname',BrandName);