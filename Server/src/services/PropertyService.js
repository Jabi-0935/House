import Property from "../models/Property.js";
import { Portion } from "../models/Portion.js";
import User from "../models/User.js";
import { RentRecord } from "../models/RentRecord.js";

export class PropertyService {
  
  static async getPropertyDetails(ownerId) {
    try {
      const properties = await Property.find({ ownerId });
      
      const propertyList = await Promise.all(
        properties.map(async (property) => {
          const portions = await Portion.find({ propertyId: property._id });
          const totalPortions = portions.length;
          const vacant = portions.filter(portion => portion.status !== "occupied").length;
          
          // Calculate total revenue from occupied portions
          const revenueGenerating = portions
            .filter(portion => portion.status === "occupied")
            .reduce((total, portion) => total + (portion.rent || 0), 0);
          
          return {
            _id: property._id,
            propertyName: property.propertyName,
            city: property.propertyCity,
            address: property.propertyAddress,
            totalPortions,
            vacant,
            revenueGenerating,
            createdAt: property.createdAt
          };
        })
      );
      
      return propertyList;
    } catch (error) {
      throw new Error(`Error fetching property details: ${error.message}`);
    }
  }

  static async getPortionWithTenantAndHistory(portionId) {
    try {
      // Get portion details
      const portion = await Portion.findById(portionId);
      if (!portion) {
        throw new Error("Portion not found");
      }

      // Get property details
      const property = await Property.findById(portion.propertyId);
      if (!property) {
        throw new Error("Property not found");
      }

      // Get current tenant if exists
      let currentTenant = null;
      if (portion.currentTenantId) {
        currentTenant = await User.findById(portion.currentTenantId, 'name email');
      }

      // Get rent history
      const rentHistory = await RentRecord.find({ portionId })
        .populate('tenantId', 'name email')
        .sort({ monthYear: -1 });

      return {
        portion: {
          _id: portion._id,
          title: portion.title,
          description: portion.description,
          rent: portion.rent,
          status: portion.status,
          joining_date: portion.joining_date,
          due: portion.due,
          electricitybillno: portion.electricitybillno,
          documents: portion.documents
        },
        property: {
          _id: property._id,
          name: property.propertyName,
          address: property.propertyAddress,
          city: property.propertyCity
        },
        currentTenant,
        rentHistory
      };
    } catch (error) {
      throw new Error(`Error fetching portion details: ${error.message}`);
    }
  }

  static async getPortionsByProperty(propertyId) {
    try {
      const portions = await Portion.find({ propertyId })
        .populate('currentTenantId', 'name email');
      
      return portions;
    } catch (error) {
      throw new Error(`Error fetching portions: ${error.message}`);
    }
  }
}