const mongoose=require('mongoose');

const UserSchema=mongoose.Schema({
    id:mongoose.Schema.Types.ObjectId,
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{
        required:true,
        type:String,
        unique:true,
        match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    },
    password:{type:String,required:true},
    videos:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Video'
        }
    ]
});

module.exports=mongoose.model('User',UserSchema);