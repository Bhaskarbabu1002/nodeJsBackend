const mongoose = require('mongoose');
const product = require('../models/product');
const Product = require('../models/product');

exports.products_get_all = (req,res,next)=>{

    //pagination & Sorting
    //
    let {page,limit, sort,desc} = req.query;
    if(!page) page = 1;
    if(!limit) limit = 10;
    // skipping ex: if page is 2 -->(2-1)*10=10 after 
    const skip = (page-1) * 10;
    product.find().sort({[sort]: desc}).skip(skip).limit(limit)
    // fetch these details only we use select
    .select('name price _id image')
    .exec()
    .then(docs =>{
       console.log(docs);
       const response = {
        count:docs.length,
        page:page,
        limit:limit,
        products:docs.map(doc =>{
            console.log("docs", doc)
            return {
               name: doc.name,
               price: doc.price,
               _id: doc._id,
               image:doc.image,
               request : {
                type: 'GET',
                url: 'http://localhost:4000/products/' + doc._id
               }
            }
        })
       };
    //    console.log(req.query)
    //    const products = products.find().where('duaration').equals(5).where('difficulty').equals('easy')
       res.status(200).json(response);
    //    if (docs.length >= 0) {
    //     res.status(200).json(docs);
    //    } else {
    //     res.status(404).json({
    //         message:'No Entries Found'
    //     });
    //    }
     
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
//     // res.status(200).json({
//     // message:'Handling get requests to products'
// })
 };

 exports.products_create_product = (req,res,next)=>{
    console.log("test",req.file);
    const product = new Product({
         _id:new mongoose.Types.ObjectId(),
         name:req.body.name,
         price:req.body.price,
         image:req.file.path
    });
    product.save().then(result =>{
        console.log("testing",result);
        res.status(201).json({
            message:'Created Product sucessfully',
            // createdProduct:result
            createdOrder:{
                product: result.product,
                quantity: result.quantity,
                _id: result._id,
                request:{
                    type: 'GET',
                    url:'http://localhost:4000/orders/' + result._id
                }
            }
        });
    }).catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    } 
    
    );

 };

 exports.products_get_productId = (req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
    .select('name price _id image')
    .exec()
    .then(doc=>{
        console.log("From Database",doc);
        if(doc){
            // res.status(200).json(doc);
            res.status(200).json({
                product:doc,
                request : {
                    type:'GET',
                    url:'http://localhost:4000/products/'
                }
            });
        } else {
            res.status(404).json({message:'No Valid Entry found for provided Id'});
        }
     
    }).catch(err =>{
        console.log(err);
        res.status(500).json({error:err})
    });
 };

 exports.products_update_product = (req,res,next)=>{
    const id = req.params.productId;
    Product.update({_id:id},{$set:{name:req.body.name, price:req.body.price}}).exec().then(result =>{
        console.log("findAndUpdate,", result);
        //    res.status(200).json(result);
           res.status(200).json({
            message:'product updated',
            request:{
                type:'GET',
                url:'http://localhost:4000/products/' + id
            }
           });
    }).catch(err =>{
        res.status(500).json({
            error:err
        })
    });

    // For using Props
    // const updateOps = {};
    // for (const ops of req.body){
    //   updateOps[ops.propName] = ops.value;
    // }
    // Product.update({_id:id},{$set:updateOps}).exec().then(result =>{
    //     console.log("findAndUpdate,", result);
    //     //    res.status(200).json(result);
    //        res.status(200).json({
    //         message:'product updated',
    //         request:{
    //             type:'GET',
    //             url:'http://localhost:4000/products/' + id
    //         }
    //        });
    // }).catch(err =>{
    //     res.status(500).json({
    //         error:err
    //     })
    // });
 };

 exports.products_delete_product = (req,res,next)=>{
    const id = req.params.productId;
    Product.remove({_id:id}).exec().then(result =>{
    //  res.status(200).json(result);
     res.status(200).json({
        message:'product deleted Sucessfully',
        request:{
            type:'POST',
            url:'http://localhost:4000/products/',
            body:{name:'String',price:'Number'}
        }
     });
    }).catch(err =>{
      res.status(500).json({
        error:err
      })
    })
    // res.status(200).json({
    //     message:'Deleted Product'
    // });
}