import Property from "../models/Property.js";
import User from "../models/User.js";
import { Portion } from "../models/Portion.js";
import { RentRecord } from "../models/RentRecord.js";
import { PropertyService } from "../services/PropertyService.js";
import { RentService } from "../services/RentService.js";

export const addProperty = async (req, res) => {
  const curr_user = await User.findById(req.user.user_id);

  if (!curr_user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (curr_user.type !== "owner") {
    return res
      .status(403)
      .json({ error: "Unauthorized Access - Only owners can add properties" });
  }

  const new_Property = new Property({
    ownerId: req.user.user_id,
    propertyName: req.body.propertyName,
    propertyCity: req.body.propertyCity,
    propertyAddress: req.body.propertyAddress,
  });
  await new_Property.save();
  res.json({ message: "working", new_Property });
};

// Add Portion
export const addPortion = async (req, res) => {
  const curr_user = await User.findById(req.user.user_id);
  const curr_prop = await Property.findById(req.body.property_id);
  if (!curr_user && !curr_prop) {
    res.status(402).json({ error: "Request Error" });
  }
  if (curr_user.type !== "owner") {
    return res
      .status(403)
      .json({ error: "Unauthorized Access - Only owners Have Access to this" });
  }
  if (!curr_prop.ownerId.equals(curr_user._id)) {
    return res
      .status(403)
      .json({ error: "Unauthorized Access - Not the owner of the Prop" });
  }

  const curr_portion = new Portion({
    propertyId: req.body.property_id,
    title: req.body.title,
    rent: req.body.rent,
    description: req.body.description,
  });

  curr_portion.save();
  res.json({ message: "Portion Added" });
};

// Assign Tenant
export const assignTenant = async (req, res) => {
  const curr_user = await User.findById(req.user.user_id);
  const curr_portion = await Portion.findById(req.body.portion_id);
  var curr_tenant;
  if (!req.body.tenant_id && !(await User.findOne({ email: req.body.email }))) {
    const tenant = new User({
      name: req.body.name,
      email: req.body.email,
      password: "123456",
      type: "tenant",
    });
    tenant.save();
  }
  curr_tenant = await User.findOne({ email: req.body.email });
  if (!curr_user && !curr_portion && !curr_tenant) {
    res.status(402).json({ error: "Request Error" });
  }
  if (curr_user.type !== "owner") {
    return res
      .status(403)
      .json({ error: "Unauthorized Access - Only owners Have Access to this" });
  }
  console.log(curr_portion.propertyId);
  console.log(await Property.findById(curr_portion.propertyId));
  const prop_owner = await Property.findById(curr_portion.propertyId);
  if (!prop_owner.ownerId.equals(curr_user._id)) {
    return res
      .status(403)
      .json({ error: "Unauthorized Access - Not the owner of the Property" });
  }
  curr_portion.currentTenantId = curr_tenant._id;
  curr_portion.rent = req.body.rent;
  curr_portion.status = "occupied";
  curr_portion.joining_date = req.body.joining_date
    ? req.body.joining_date
    : Date.now();

  await curr_portion.save();
  res.json({ message: "Asigned the tenant" });
};

// Property Details
export const propertyDetails = async (req, res) => {
  try {
    const curr_user = await User.findById(req.user.user_id);

    if (!curr_user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (curr_user.type !== "owner") {
      return res.status(403).json({ error: "Only for the Owners" });
    }

    const propertyList = await PropertyService.getPropertyDetails(curr_user._id);

    // Format response to match existing API structure
    const formattedProperties = propertyList.map(property => ({
      propertyName: property.propertyName,
      city: property.city,
      address: property.address,
      totalPortions: property.totalPortions,
      vacant: property.vacant,
    }));

    res.json({
      message: "Properties retrieved successfully",
      properties: formattedProperties,
    });
  } catch (error) {
    console.error("Error fetching property details:", error);
    res.status(500).json({ error: error.message });
  }
};

export const portionDetails = async (req, res) => {
  try {
    const curr_user = await User.findById(req.user.user_id);
    const curr_prop = await Property.findById(req.body.property_id);
    console.log(curr_prop, curr_user);

    if (!curr_user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!curr_prop) {
      return res.status(404).json({ error: "Property not found" });
    }

    if (curr_user.type !== "owner") {
      return res.status(403).json({ error: "Only for the Owners" });
    }
    if (!curr_prop.ownerId.equals(curr_user._id)) {
      return res
        .status(401)
        .json({ error: "Access Denied. Only for Owner of Property" });
    }

    const prop_portions = await PropertyService.getPortionsByProperty(curr_prop._id);

    res.json({ portionDetails: prop_portions });
  } catch (err) {
    res.status(500).json({ error: err });
    console.error(err);
  }
};

// Portion History
export const portionHistory = async (req, res) => {
  try {
    const curr_portion = await Portion.findById(req.query.id);
    const curr_user = await User.findById(req.user.user_id);
    
    if (!curr_portion) {
      return res.status(404).json({ error: "Portion not found" });
    }
    
    if (!curr_user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    const curr_prop = await Property.findById(curr_portion.propertyId);
    
    if (!curr_prop) {
      return res.status(404).json({ error: "Property not found" });
    }
    
    if (curr_user.type !== "owner" || !curr_prop.ownerId.equals(curr_user._id)) {
      return res.status(403).json({ 
        error: "Unauthorized Access - Only property owner can view portion history" 
      });
    }
    
    const portionData = await PropertyService.getPortionWithTenantAndHistory(req.query.id);
    
    const response = {
      portion: {
        title: portionData.portion.title,
        description: portionData.portion.description,
        rent: portionData.portion.rent,
        status: portionData.portion.status,
        joining_date: portionData.portion.joining_date,
        due: portionData.portion.due
      },
      property: {
        name: portionData.property.name,
        address: portionData.property.address,
        city: portionData.property.city
      },
      currentTenant: portionData.currentTenant,
      rentHistory: portionData.rentHistory
    };
    
    res.json({
      message: "Portion history retrieved successfully",
      data: response
    });
    
  } catch (error) {
    console.error("Error fetching portion history:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update Rent Payment
export const updateRentPayment = async (req, res) => {
  try {
    const { rentRecordId, paid, paidOn, transactionId, paymentMode, partialAmount } = req.body;
    const curr_user = await User.findById(req.user.user_id);
    
    if (!curr_user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (curr_user.type !== "owner") {
      return res.status(403).json({ error: "Only owners can update rent payments" });
    }
    
    // Find the rent record
    const rentRecord = await RentRecord.findById(rentRecordId);
    if (!rentRecord) {
      return res.status(404).json({ error: "Rent record not found" });
    }
    
    // Find the portion and verify ownership
    const portion = await Portion.findById(rentRecord.portionId);
    if (!portion) {
      return res.status(404).json({ error: "Portion not found" });
    }
    
    const property = await Property.findById(portion.propertyId);
    if (!property || !property.ownerId.equals(curr_user._id)) {
      return res.status(403).json({ error: "Unauthorized - Not the owner of this property" });
    }
    
    const paymentData = { paid, paidOn, transactionId, paymentMode, partialAmount };
    const result = await RentService.updatePaymentStatus(rentRecordId, paymentData);
    
    res.json({
      message: "Rent payment updated successfully",
      rentRecord: result.rentRecord,
      portion: result.portion
    });
    
  } catch (error) {
    console.error("Error updating rent payment:", error);
    res.status(500).json({ error: error.message });
  }
};