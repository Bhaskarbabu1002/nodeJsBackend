// const orderItems = require('../models/orderItems');
const mongoose = require('mongoose');
const OrderItems = require('../models/orderItems');
const product = require('../models/product');


exports.orders_get_all =  (req,res,next)=>{
   //pagination and Sorting
   let {page,limit, sort,desc} = req.query;
   if(!page) page = 1;
   if(!limit) limit = 10;
      // skipping ex: if page is 2 -->(2-1)*10=10 after 
      const skip = (page-1) * 10;
    OrderItems.find().sort({[sort]: desc}).skip(skip).limit(limit)
    .select('product quantity _id')
    .populate('product','name')
    .exec()
    .then(docs=>{
       res.status(200).json({
          count:docs.length,
          orders:docs.map(doc =>{
             return {
               _id: doc._id,
                product: doc.product,
                quantity: doc.quantity,
                request : {
                 type: 'GET',
                 url: 'http://localhost:4000/orders/' + doc._id
                }
             }
         })
       });
    }).catch(err =>{
       res.status(500).json({
          error:err
       })
    })
 //    res.status(200).json({
 //    message:'Orders were fetch'
 // });
 };

 exports.orders_create_all = (req,res,next)=>{
   console.log("req.body.productId",req.body.productId);
   product.findById(req.body.productId)
   .then(product=>{
      if (!product) {
         return res.status(404).json({
            message:'Product Not Found'
         })
      }
      // console.log("product in orders======>",product);
      const order = new OrderItems ({
         _id : mongoose.Types.ObjectId(),
         quantity: req.body.quantity,
         product : req.body.productId
       });
       return order.save();
      })
.then(result =>{
   console.log(result);
   res.status(200).json({
      message:'Order Stored',
      createdOrder:{
         _id :result._id,
         quantity: result.quantity,
         product : result.product
      },
      // request:{
      //    type:'GET',
      //    url:'http://localhost:4000/orders/'+ result._id
      // }
   });
 }).catch(err=>{
   console.log(err);
   res.status(500).json({
      error:err
   });
 });
};

exports.orders_get_orderId = (req,res,next)=>{
   OrderItems.findById(req.params.orderId)
   .populate('product')
   .exec()
   .then(order=>{
      if (!order) {
         return res.status(404).json({
            message:'Order Not Found'
         })
      }
      res.status(200).json({
         order:order,
         request:{
            type:'GET',
            url:'http://localhost:4000/orders/'
         }
      })
   })
   .catch(err=>{
      res.status(500).json({
         message:'Order Id is not valid',
         error:err
      })
   })
//     res.status(200).json({
//     message:'Orders details',
//     orderId: req.params.orderId
//  });
};

exports.orders_delete_order =  (req,res,next)=>{
   OrderItems.remove({_id:req.params.orderId})
   .exec()
   .then(result =>{
      //  res.status(200).json(result);
       res.status(200).json({
          message:'Order deleted Sucessfully',
          request:{
              type:'POST',
              url:'http://localhost:4000/orders/',
              body:{productId:'ID',quantity:'Number'}
          }
       });
      }).catch(err =>{
        res.status(500).json({
          error:err
        });
      });
//     res.status(200).json({
//     message:'Orders Created',
//     orderId: req.params.orderId
//  })
}