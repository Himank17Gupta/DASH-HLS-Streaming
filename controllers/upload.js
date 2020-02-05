const express = require('express');
const route = express.Router();
const multer = require('multer');
const path = require('path');
//const shelljs=require('shelljs');
//const testFunction=require('../test');
const script=require('../test');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
       let currentPath =  path.normalize(__dirname+"/");
     //let currentPath = __dirname.normalize('/..');
        console.log('Current Path is ..... ',currentPath+'/uploads/');
      callback(null,currentPath+'../uploads/');                   // null represent error
    },
    filename: function (req, file, callback) {
         console.log("File ",file);
      callback(null, file.originalname );
    }
  });
 /* upload.single --> it return the function 
  and this function act as a middleware*/
  
var upload = multer({fileFilter: function (req, file, callback) {
   // console.log("File is ",file);
  if (path.extname(file.originalname) !== '.mp4') {
      
    return callback(new Error('Only mp4 are allowed'),false);
  }
else{
 // console.log(file.originalname);
  return callback(null,true);
}
}, storage: storage , limits: { fileSize: 1024*1024*100 }}); //100 MB

var uploading = upload.single('videoFile');

route.post('/upload',uploading,(req,res)=>{
  console.log("Inside Upload Post ");
    uploading(req,res,(err)=>{
        if(err){
            console.log("Inside If Condition.... ",err);
            res.send("Error Occurred while upload ");
        }
        else{
            console.log(req.file.filename);
            var filename='./uploads/'+req.file.filename;
            console.log('b4 res&&script');
            res.send("File Uploaded Done....");
            console.log('after res.send');
            script(filename,req.file.filename);     
        }
    })
});

route.get('/stream',(req,res)=>{
  console.log(req.data);
  console.log(__dirname);
 // res.sendFile('SampleVideo_1280x720_1mb.mp4.mpd',{root: __dirname+'manifest\'});
});


module.exports = route;