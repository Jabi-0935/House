import mongoose from "mongoose";

const RentRecordSchema = new mongoose.Schema({
  tenantId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
  portionId: { type: mongoose.Schema.ObjectId, ref: "Portion", required: true },
  monthYear: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  paid: { type: Boolean, default: false },
  paidOn: { type: Date, default: null },
  paymentMode: { type: String, default: null },
  transactionId: { type: String, default: null },
  isLate: { type: Boolean, default: false },
  partialAmount: { type: Number, default: 0 },
}, { timestamps: true });

RentRecordSchema.index({ portionId: 1, monthYear: 1 }, { unique: true });

export const RentRecord = mongoose.model("RentRecord", RentRecordSchema);
