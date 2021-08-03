var mongoose=require('mongoose');

var video_schema=new mongoose.Schema({
    title:String,
    video_path:String,
    author_name:String,
    thumbnail_path:String,
    video_name:String
})

module.exports=mongoose.model('Video',video_schema);