const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/userRoute');

// Mongodb Connect
mongoose.connect('mongodb+srv://BhaskarBabu:vYFuD67wa1lj8eCk@testcluster.7homggd.mongodb.net/?retryWrites=true&w=majority',{
  dbName:'testapp'
}, (err) => {
    if (!err) {
      console.log("Mongoose connected successfully");
    } else {
      console.log("Error in connection");
    }
  });
  mongoose.Promise = global.Promise;
  
// Body-parser: is the Node.js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Public path for upload image
app.use('/uploads',express.static('uploads'));

// Handling CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  });


  // testing
  app.get("/ping", (req, res) => {
    res.send("PONG")
  })


app.use ('/products',productRoutes);
app.use ('/orders',orderRoutes);
app.use ('/user',userRoutes);

// Error Handling
app.use((req,res,next)=>{
      const error = new Error ('404 Not found');
      error.status = 404;
      next(error);
});

app.use((error,req,res,next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
                message:error.message
        }
    })
})

module.exports = app;