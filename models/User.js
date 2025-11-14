import mongoose from "mongoose";




const UserSchema = new mongoose.Schema({
  fullName : {type : String , lowercase : true },
  email : { type : String , unique : true , required : true , trim : true},
  password : {type : String , required : true},
  phoneNumber : Number,
  role : { type : String , enum : ["user" , "admin"] , default : "user" } 
},{
    timestamps : true
})


export default mongoose.model('User', UserSchema);

