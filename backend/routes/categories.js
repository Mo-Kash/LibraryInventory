import express from "express";
import * as categoryController from "../controllers/categoryController.js";

const router = express.Router();

// CATEGORY ROUTES
router.get("/", categoryController.getCategories);
router.get("/types", categoryController.getTypes);

export default router;