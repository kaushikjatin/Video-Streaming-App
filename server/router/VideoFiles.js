const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
var multer  = require('multer')
const {checkAuth}=require('../middlewares/Auth_related');
const {generateThumbnail}=require('../helpers/generateThumbnail')


var time=Date.now();
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'../VIDEOS')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + time+'.mp4')
      }
})
const upload=multer({
    storage:storage,
    limits:{
        fileSize:50*1024*1024
    },
})


router.post('/upload_video',checkAuth,(req,res)=>{
        upload.single('userFile')(req,res,function(err){
            if (err instanceof multer.MulterError) {
                console.log(err);
                res.status(500).send(err)
              } else if (err) {
                res.status(500).json({message:'An Internal Error occured while uploading file'})
              }else{
                const video_path='../VIDEOS/' +'userFile'+'-'+time+'.mp4';
                const destination='../THUMBNAILS/'+'userFile'+'-'+time+'.png';
               generateThumbnail(video_path,destination);
                res.status(200).json({message:'File Uploaded Succesfully'})
              }
        })
        time=Date.now();
})

module.exports=router;