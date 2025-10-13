import express from "express";
import { signup, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const authRoutes = express.Router();

authRoutes.post("/signup", async (req, res) => {
  try {
    await signup(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
});

authRoutes.post("/login", async (req, res) => {
  try {
    login(req, res);
  } catch (err) {
    res.status(501).json({error:err});
    console.log(err)
  }
});
