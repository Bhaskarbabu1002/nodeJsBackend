 const express = require('express');
 const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productsController = require('../controllers/productsController');
const path = require('path');

// Multer: Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'uploads', 
  // Filename determines what a file should be named in the folder.
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() 
           + path.extname(file.originalname))
    // file.fieldname is name of the field (image)
    // path.extname get the uploaded file extension
  }
});

const imageUpload = multer({
 // The multer() method takes an object with storage property.
  storage: imageStorage,
  // The limits property describes the maximum size of the file.
  limits: {
    fileSize: 1000000000 // 1000000 Bytes = 1 MB
  },
  // The fileFilter() method is for security reasons
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg|mp4)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
}
}) 

 router.get('/' ,productsController.products_get_all);
 router.get('/' ,productsController.products_get_all);

 router.post('/', imageUpload.single('image'), productsController.products_create_product);

 router.get('/:productId',checkAuth, productsController.products_get_productId);

 router.put('/:productId',checkAuth,productsController.products_update_product);

 router.delete('/:productId',checkAuth, productsController.products_delete_product);
 
 module.exports = router;