import mongoose from "mongoose";
const {Schema} = mongoose;

const PortionSchema = new Schema({
    propertyId:{type:Schema.ObjectId,ref:'Property',required:true},
    title:{type:String,required:true},
    rent:{type:Number,required:true},
    taken:{type:Boolean,required:true,default:false},
    joining_date:{type:Date,default:null,required:true},
    due:{type:Number,default:0},
},{ timestamps: true })
export const Portion = mongoose.model('Portion',PortionSchema)