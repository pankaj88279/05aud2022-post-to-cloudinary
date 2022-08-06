console.log('hello')
const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=express('path');
const multer=require('multer');
const { uuid } = require('uuidv4');
require('dotenv').config();
const fs = require('fs');
const cloudinary=require('cloudinary');

cloudinary.config({ 
     
    cloud_name: process.env.CLOUD_NAME, 
    api_key:process.env.API_NAME, 
    api_secret:process.env.API_SECRET  
  });

  const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
      cb(null, './upload')
    },
    filename: function (req, file, cb) {
      
      let random=uuid();
      let filen=random+""+file.originalname;
      cb(null, filen)
    }
  })
  
  const upload = multer({ storage })



 mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@${process.env.USER_DB}.4gb2s.mongodb.net/?retryWrites=true&w=majority`)
 .then((d)=>{
    console.log('connected');
 }).catch((e)=>{
    console.log('unconnected');
 })
  app.post('/image',upload.single('mypic'),(req,res)=>{
  
     console.log(req.file.path)
   
    cloudinary.uploader.upload( req.file.path, function(error, result) {
      fs.unlink(req.file.path, function(err){
        if (err) console.log(err);
        else console.log("File Deleted");
    })
       console.log(result, error
            
      )});
    res.status(200).json({
        msg:'image uploded sucessfully'
    })
  });
 
 
const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`this port running on port ${PORT}`)
})