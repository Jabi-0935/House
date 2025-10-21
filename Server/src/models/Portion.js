import mongoose from "mongoose";
const {Schema} = mongoose;

const PortionSchema = new Schema({
    propertyId:{type:Schema.ObjectId,ref:'Property',required:true},
    currentTenantId:{type:Schema.ObjectId,ref:'User',default:null},
    title:{type:String,required:true,unique:true},
    description:{type:String,required:true},
    rent:{type:Number,required:true},
    status:{type:String,enum:['vacant','occupied'],default:'vacant'},
    joining_date:{type:Date,default:null},
    due:{type:Number,default:0},
    electricitybillno:{type:String,default:null},
    documents: [{ type: String, url: String, note: String }]
},{ timestamps: true })
export const Portion = mongoose.model('Portion',PortionSchema)