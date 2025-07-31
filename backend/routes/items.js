import express from "express";
import * as itemController from "../controllers/itemController.js";

const router = express.Router();

// ITEM ROUTES
//GET
router.get("/", itemController.getAllItems);

router.get("/category/:categoryId", itemController.getItemsByCategory);

router.get("/:id", itemController.getItemById);

//POST
router.post("/", itemController.addItem);

//PUT
router.put("/:id", itemController.updateItem); // send all details for put request

//PATCH
router.patch("/:id/quantity", itemController.updateQuantity); // patch request to update only quantity

//DELETE
router.delete("/:id", itemController.deleteItem);

export default router;