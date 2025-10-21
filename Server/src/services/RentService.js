import { RentRecord } from "../models/RentRecord.js";
import { Portion } from "../models/Portion.js";

export class RentService {

  static async calculateDue(portionId) {
    try {
      const portion = await Portion.findById(portionId);
      if (!portion) {
        throw new Error("Portion not found");
      }

      // Get all rent records for this portion
      const rentRecords = await RentRecord.find({ portionId });
      
      let totalDue = 0;
      
      for (const record of rentRecords) {
        if (!record.paid) {
          // Full amount is due if not paid
          totalDue += record.rentAmount;
        } else if (record.partialAmount > 0 && record.partialAmount < record.rentAmount) {
          // Partial payment made, add remaining amount
          const remainingAmount = record.rentAmount - record.partialAmount;
          totalDue += remainingAmount;
        }
      }

      return totalDue;
    } catch (error) {
      throw new Error(`Error calculating due: ${error.message}`);
    }
  }

  static async createInitialRentRecord(portionId, tenantId, rentAmount, monthYear) {
    try {
      // Check if record already exists for this month
      const existingRecord = await RentRecord.findOne({ 
        portionId, 
        monthYear 
      });

      if (existingRecord) {
        throw new Error(`Rent record already exists for ${monthYear}`);
      }

      const rentRecord = new RentRecord({
        tenantId,
        portionId,
        monthYear,
        rentAmount,
        paid: false,
        partialAmount: 0
      });

      await rentRecord.save();

      // Update portion due
      const portion = await Portion.findById(portionId);
      if (portion) {
        portion.due = (portion.due || 0) + rentAmount;
        await portion.save();
      }

      return rentRecord;
    } catch (error) {
      throw new Error(`Error creating rent record: ${error.message}`);
    }
  }

  static async updatePaymentStatus(rentRecordId, paymentData) {
    try {
      const { paid, paidOn, transactionId, paymentMode, partialAmount } = paymentData;
      
      const rentRecord = await RentRecord.findById(rentRecordId);
      if (!rentRecord) {
        throw new Error("Rent record not found");
      }

      const portion = await Portion.findById(rentRecord.portionId);
      if (!portion) {
        throw new Error("Portion not found");
      }

      // Store previous payment amount for due calculation
      const previousPartialAmount = rentRecord.partialAmount || 0;

      // Update rent record
      rentRecord.paid = paid;
      rentRecord.paidOn = paid ? (paidOn || new Date()) : null;
      rentRecord.transactionId = transactionId || null;
      rentRecord.paymentMode = paymentMode || null;
      rentRecord.partialAmount = partialAmount || 0;

      await rentRecord.save();

      // Recalculate portion due
      const rentAmount = rentRecord.rentAmount;
      const newPartialAmount = rentRecord.partialAmount;

      if (paid) {
        // Full payment - reduce due by remaining amount
        const remainingAmount = rentAmount - previousPartialAmount;
        portion.due = Math.max(0, portion.due - remainingAmount);
      } else {
        // Partial or no payment - adjust due based on difference in partial amounts
        const paymentDifference = newPartialAmount - previousPartialAmount;
        portion.due = Math.max(0, portion.due - paymentDifference);
      }

      await portion.save();

      // Populate tenant info for response
      await rentRecord.populate('tenantId', 'name email');

      return {
        rentRecord,
        portion: {
          id: portion._id,
          title: portion.title,
          due: portion.due
        }
      };
    } catch (error) {
      throw new Error(`Error updating payment status: ${error.message}`);
    }
  }

  static async generateMonthlyRentRecords(portionId) {
    try {
      const portion = await Portion.findById(portionId);
      if (!portion || !portion.currentTenantId) {
        throw new Error("Portion not found or no tenant assigned");
      }

      const currentDate = new Date();
      const currentMonthYear = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

      return await this.createInitialRentRecord(
        portionId,
        portion.currentTenantId,
        portion.rent,
        currentMonthYear
      );
    } catch (error) {
      throw new Error(`Error generating monthly rent record: ${error.message}`);
    }
  }
}