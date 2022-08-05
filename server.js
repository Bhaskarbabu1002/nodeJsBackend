// Http Module

// var http = require('http');
// // http.createServer((req,res)=>{
// // res.write('Hello World');
// // res.end();
// // console.log('server running....')
// // }).listen(8080)
// http.createServer((req,res)=>{
//     res.write(req.url);
//     res.end();
//     console.log('server running....')
//     }).listen(8080)


    // File System Module
    // 1.readFile

// var http = require ('http');
// var fs = require ('fs');
// http.createServer((req,res)=>{
// fs.readFile('test.txt',(err,data)=>{
// res.write(data);
// res.end();
// })
// }).listen(8080)

//2.override the File===> appendFile
// var http = require ('http');
// var fs = require ('fs');

// http.createServer((req,res)=>{
// fs.appendFile('test.txt','Bhaskar',(err,data)=>{
// res.write(data);
// res.end();
// })
// }).listen(8080)

// 3.writeFile
// var http = require ('http');
// var fs = require ('fs');

// http.createServer((req,res)=>{
//     // File is removed and replaced by existing content
// fs.writeFile('test.txt','Thank you',(err,data)=>{
// res.write(data);
// res.end();
// })
// }).listen(8080)
// 3.Unlink
// var http = require ('http');
// var fs = require ('fs');

// http.createServer((req,res)=>{
//     // Delete the file
// fs.unlink('test.txt',(err)=>{
// if(err) throw(err);
// Console.log('file deleted')
// })
// }).listen(8080)

// URL Module

// var url = require('url');
// var adrs = 'http://localhost:8080/home.html?year=2018&month=feb'
// var q = url.parse(adrs,true);
// // host
// console.log(q.host);
// // pathname
// console.log(q.pathname);
// // search
// console.log(q.search);


// const express = require('express');
// const app=express();
// mongoose.connect("mongodb://127.0.0.1:27017/inlanddb", { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }).then(res => {
//     console.log("mongodb is connected successfully");
// }).catch(err => {
//     console.log(err);
// })
// app.get('/',function(req,res){

//     console.log("testing");
// }).listen(8080)

// const http = require('http');
// const app = require ('./app');

// const port = process.env.PORT || 3000;
// const server = http.createServer(app);
// server.listen(port);
// const fs = require('fs');
// fs.readFile('./txt/starttttt.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('ERROR! 💥');
  
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//       console.log(data2);
//       fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//         console.log(data3);
//         fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//           console.log('Your file has been written 😁');
//         })
//       });
//     });
//   });
//   console.log('Will read file!');


// const express = require('express');
// const app = express();
// app.use (express.json());
// app.get('/',(req,res)=>{
// res.send('<h1>Hello World..👏</h1>')
// })
// const products =[
//     {
//         id : 1,
//         name: "iphone"
//     },
//     {
//         id:2,
//         name: "oneplus"
//     },
//     {
//         id:3,
//         name: "honor"
//     },
//     {
//         id:4,
//         name:"mi"
//     }
// ]
// app.get('/products',(req,res)=>{
//     res.json(products)
// })
// // pathparams
// app.get('/products/:id',(req,res)=>{
//     const newData = products.filter(item => item.id.toString() ===  req.params.id)
//     return res.json(newData)
// })
// // Post Method
// app.post('/addproducts',(req,res)=>{
//     const {id,name} = req.body;
//     console.log(id,name);
//     return res.send('Data stored...!!');
// })
// app.listen(5000,()=>{
//     console.log('server is running...')
// })




// const express = require('express');
// const BrandName = require('./model');
// const app = express();
// // MiddleWare or bodyParser
// app.use(express.json());
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://bhaskarrv1:bhaskarrv1@cluster0.fzrwdrs.mongodb.net/?retryWrites=true&w=majority').then(
//    () => console.log('DB Connect..!!!')
// ).catch(err => console.log(err));


// app.post('/addProducts',async (req,res)=>{
//     const brandname = req.body ;
//      try {
//         const newData = new BrandName({brandname});
//         await newData.save();
//         return res.json (await BrandName.find())
//      } catch (err) {
//         console.log(err.message);
//      }
// })
// // app.get('/',(req,res)=>{
// // res.send('Data Stored..!!')
// // })
// app.listen(4000,()=>{
//     console.log('Server is running...')
// })


const http = require('http');
const app = require ('./app');

// app.listen(5000,()=>{
//     console.log('Server is running...')
// })
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);

app.get("/ping", (req, res) => {
    res.send("PONG")
  })
