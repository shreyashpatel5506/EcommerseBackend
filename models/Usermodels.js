const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        phone :{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        Address:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        }

    },{timestamps:true}
)

export default mongoose.model('user',userSchema);