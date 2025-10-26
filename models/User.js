import mongoose from "mongoose";




const UserSchema = new mongoose.Schema({
  fullName : String,
  email : { type : String , unique : true , required : true },
  password : String,
  phoneNumber : Number,
  isAdmin : { type : Boolean , default : false } 
},{
    timestamps : true
})


export default mongoose.model('User', UserSchema);

