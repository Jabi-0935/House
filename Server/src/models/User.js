import mongoose from "mongoose";
const { Schema } = mongoose;
const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String,unique:true,lowercase:true, required: true },
  password:{type:String,required:true},
  type:{type:String,enum:['owner','tenant'],required:true},
},{ timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;
