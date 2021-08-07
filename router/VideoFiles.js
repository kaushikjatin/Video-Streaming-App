const express=require('express');
const router = express.Router();
const mongoose=require('mongoose');
var multer  = require('multer');
var User=require('../modals/user');
var Video=require('../modals/videos');
const {checkAuth}=require('../middlewares/Auth_related');
const {generateThumbnail}=require('../helpers/generateThumbnail')
const fs=require('fs-extra');
const path = require('path'); 



const storagePath='./UPLOADS/VIDEOS'
var time=Date.now();


var storage=multer.diskStorage({
    destination:function(req,file,cœb){
        cb(null,'./UPLOADS/VIDEOS')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + time+'.mp4')
      }
})
const upload=multer({
    storage:storage,
    limits:{
        fileSize:20 * 1000 * 1000   // limit of size if 20 Megabyte.
    },
})


router.get('/videos_list',(req,res)=>{
  try{
    Video.find({},function(err,videos){
      if(err)
      {
          res.status(500).json({message:'Internal Database Error'});
      }
      else
      {
        var videos_list=videos.map(function(video_obj){
            const new_obj={
              title:video_obj.title,
              video_path:video_obj.video_path,
              author_name:video_obj.author_name,
              thumbnail_path:video_obj.thumbnail_path,
              video_name:video_obj.video_name
            }
            return new_obj;
        })
        res.status(200).send({videos:videos_list});
      }
    })
  }catch(error){
    console.log('THis is the error',error);
    res.status(500).send({message:'Internal DataBase Error'});
  }
})

router.post('/get_my_videos',checkAuth,(req,res)=>{
  try{
    const user_id=req.body.currentUser_id;
    User.findById(user_id).populate('videos').exec(function(err,user){
      if(err)
      {
          res.status(500).send({message:'Internal Database Error'});
      }
      else
      {
        res.status(200).send({videos:user.videos});
      }
    })
  }catch(error){
    console.log('THis is the error',error);
    res.status(500).send({message:'Internal DataBase Error'});
  }
})

router.delete("/:video_id",checkAuth,(req,res)=>{
  try{
      const file_name=req.body.title;
      const videoPath= path.join(__dirname,'../UPLOADS/VIDEOS',file_name);
      const thumbnailPath=path.join(__dirname,'../UPLOADS/THUMBNAILS',file_name).split(".")[0]+'.png';
      const video_id=req.params.video_id;

      if(fs.existsSync(videoPath)){
          fs.unlink(videoPath,function(err){
            if(err){console.log(err);
              res.status(500).send({message:'Internal Server Error'})}
            else{
              fs.unlink(thumbnailPath,function(err){
                if(err){res.status(500).send({message:'Internal Server Error'})}
                else{
                  Video.findByIdAndDelete(video_id,function(err){
                    if(err)
                    {res.status(500).send({message:'Internal Database Error'})}
                    else
                    {res.status(200).send({message:'Video Deleted Successfully'})};
                  })
                }
              })
            }
          });
      }else{
        Video.findByIdAndDelete(video_id,function(err){
          if(err)
          {res.status(500).send({message:'Internal Database Error'})}
          else
          {res.status(200).send({message:'Video Deleted Successfully'})};
        })
      }
  }catch(error){
    console.log("This is error",error);
    res.status(500).send({message:'Internal DataBase Error'});
  }
})


router.get('/:file_name',(req,res)=>{
  try{
    const range = req.headers.range;
      if (!range) {
        res.status(400).send("Requires Range header");
      }else{
        const videoPath= path.join(__dirname,'../UPLOADS/VIDEOS',req.params.file_name);
        const videoSize = fs.statSync(videoPath).size;
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        };
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
      }
  }catch(error){
    if (error.code === 'ENOENT') {
      res.status(404).send({message:'The file you are asking for have been taken down by the user.'})
    } else {
      res.status(500).send({message:'Internal Server Error'});
    }
  }
})




router.post('/upload_video',checkAuth,(req,res)=>{

    var video_obj={}
    try{
      req.pipe(req.busboy);

        req.busboy.on('field',(fieldname,value)=>{
          video_obj={
            'video_name':value
          }
        })

        req.busboy.on('file', (fieldname, file, filename) => {
          fileName=fieldname+'-' + time+'.mp4';
          // Create a write stream of the new file
          const fstream = fs.createWriteStream(path.join(storagePath, fileName));
          // Pipe it trough
          file.pipe(fstream);
          // On finish of the upload
          fstream.on('finish', () => {
                fstream.close(() => {
                 });
                
                const video_path='./UPLOADS/VIDEOS/' +'userFile'+'-'+time+'.mp4';
                const destination='./UPLOADS/THUMBNAILS/'+'userFile'+'-'+time+'.png';
                generateThumbnail(video_path,destination);
                video_obj={
                  ...video_obj,
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
          });



          fstream.on('error',function(err) {
            fs.unlink(path.join(storagePath, fileName));
            console.log(err);
            res.status(500).json({message:'Streaming finished but error in the file....'})
           })
      });
    }catch(error){
      console.log(error);
      res.status(500).json({message:'An Internal Error occured while uploading file'})
    }
        time=Date.now();
})

module.exports=router;