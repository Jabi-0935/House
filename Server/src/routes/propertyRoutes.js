import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  addProperty,
  addPortion,
  assignTenant,
  propertyDetails,
  portionDetails,
  portionHistory,
  updateRentPayment,
} from "../controllers/propertyController.js";

export const propertyRoutes = express.Router();

propertyRoutes.post("/addproperty", authMiddleware, async (req, res) => {
  try {
    await addProperty(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

propertyRoutes.post("/addportion", authMiddleware, async (req, res) => {
  try {
    await addPortion(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

propertyRoutes.post("/assigntenant", authMiddleware, async (req, res) => {
  try {
    await assignTenant(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

propertyRoutes.get("/propertydetails", authMiddleware, async (req, res) => {
  try {
    await propertyDetails(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

propertyRoutes.get("/portiondetails", authMiddleware, async (req, res) => {
  try {
    await portionDetails(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

propertyRoutes.get("/portionhistory", authMiddleware, async (req, res) => {
  try {
    await portionHistory(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

propertyRoutes.put("/updaterentpayment", authMiddleware, async (req, res) => {
  try {
    await updateRentPayment(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});
