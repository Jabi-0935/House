import mongoose from "mongoose";

const RentRecordSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.ObjectId, ref: "User" },

  portionId: { type: mongoose.Schema.ObjectId, ref: "Portion" },
  monthYear: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  paid: { type: Boolean, required: true, default: false },
  paidOn: { type: Date },
  paymentMode: { type: String },
  transactionId: { type: String },
},{ timestamps: true });

export const RentRecord = mongoose.model('RentRecord',RentRecordSchema);
