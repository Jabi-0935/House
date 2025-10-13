import mongoose from "mongoose";
const {Schema} =mongoose;
const PropertySchema = new Schema({
    ownerId:{type:mongoose.Schema.ObjectId,ref:'User'},
    propertyName:{type:String,required:true,unique:true},
    propertyAddress:{type:String,required:true},
    propertCity:{type:String}
},{ timestamps: true })

const Property = mongoose.model('Property',PropertySchema);
export default Property;