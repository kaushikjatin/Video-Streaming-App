const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
var multer  = require('multer');
var User=require('../modals/user');
var Video=require('../modals/videos');
const {checkAuth}=require('../middlewares/Auth_related');
const {generateThumbnail}=require('../helpers/generateThumbnail')


var time=Date.now();
var storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./UPLOADS/VIDEOS')
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


router.get('/videos_list',checkAuth,(req,res)=>{
  Video.find({},function(err,videos){
    if(err)
    {
        res.status(500).json({message:'Internal Server Error'});
    }
    else
    {
      var response=videos.map(function(video_obj){
          const new_obj={
            title:video_obj.title,
            video_path:video_obj.video_path,
            author_name:video_obj.author_name,
            thumbnail_path:video_obj.thumbnail_path
          }
          return new_obj;
      })
      console.log(response);
      res.status(200).send({videos:response});
    }
  })
})


router.post('/upload_video',checkAuth,(req,res)=>{
        upload.single('userFile')(req,res,function(err){
            if (err) 
            {
                res.status(500).json({message:'An Internal Error occured while uploading file'})
            }
            else
            {
                const video_path='./UPLOADS/VIDEOS/' +'userFile'+'-'+time+'.mp4';
                const destination='./UPLOADS/THUMBNAILS/'+'userFile'+'-'+time+'.png';
                generateThumbnail(video_path,destination);
                var video_obj={
                  title:'Temp_title'+time,
                  video_path:'userFile'+'-'+time+'.mp4',
                  thumbnail_path:'/api/thumbnails/'+'userFile'+'-'+time+'.png',
                  author_name:req.user.firstName
                }
                Video.create(video_obj,function(err,new_video){
                  if(err)
                    res.status(422).json({message:'Error while storing file in database'});
                  else
                  {
                    User.find({email:req.user.email},function(err,user){
                      if(err || user.length==0)
                          res.status(500).json({message:'Internal Servor error'});
                      else
                      {
                          user[0].videos.push(new_video);
                          user[0].save();
                          res.status(200).json({message:'File Uploaded Succesfully'})
                      }
                    })
                  }
                })
            }
        })
        time=Date.now();
})

module.exports=router;