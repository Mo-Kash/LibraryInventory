import * as itemQueries from "../db/queries.js";

//CREATE
export const addItem = async (req, res)=>{
    try {
        const itemData = req.body;
        const newItem = await itemQueries.addItem(itemData);
        res.status(201).json(newItem);
    } catch (error){
        console.error("Error adding item: ", error);
        res.status(500).json({error: "Failed to add item"});
    }
}

//READ
export const getAllItems = async (req, res)=>{
    try {
        const items = await itemQueries.getAllItems();
        if(!items){
            return res.status(404).json({error: "No items Found"});
        }
        res.json(items);
    } catch (error){
        console.error("Error getting all items: ", error);
        res.status(500).json({error: "Failed to get all items"});
    }
}

export const getItemsByCategory = async (req, res)=>{
    try {
        const { categoryId } = req.params;
        const categoryItems = await itemQueries.getItemsByCategory(categoryId);
        if(!categoryItems){
            return res.status(404).json({error: `No items found under category id: ${categoryId}`});
        }
        res.json(categoryItems);
    } catch (error){
        console.error("Error getting items by category: ", error);
        res.status(500).json({error: "Failed to get items by category"});
    }
}

export const getItemById = async (req, res)=>{
    try {
        const { id } = req.params;
        const idItem = await itemQueries.getItemById(id);
        if(!idItem){
            return res.status(404).json({error: `No item found with id ${id}`});
        }
        res.json(idItem);

    } catch (error){
        console.error("Error getting item by id: ", error);
        res.status(500).json({error: "Failed to get item by id"});
    }
}

//UPDATE
export const updateItem = async (req, res)=>{
    try {
        const { id } = req.params;
        const newItemData = req.body;
        const updatedItem = await itemQueries.updateItem(id, newItemData);

        if(!updatedItem){
            return res.status(404).json({error:"Item not found"});
        }

        res.status(201).json(updatedItem);
    } catch (error){
        console.error("Error updating item: ", error);
        res.status(500).json({error: "Failed to update item"});
    }
}

export const updateQuantity = async (req, res)=>{
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        const updatedItem = await itemQueries.updateQuantity(id, quantity);

        if(!updatedItem){
            return res.status(404).json({error:"Item not found"});
        }

        res.status(201).json(updatedItem);

    } catch (error){
        console.error("Error updating item quantity: ", error);
        res.status(500).json({error: "Failed to update item quantity"});
    }
}


//DELETE
export const deleteItem = async (req, res)=>{
    try {
        const { id } = req.params;
        const deletedItem = await itemQueries.deleteItem(id);

        if(!deletedItem){
            return res.status(404).json({error: "Item not found"});
        }

        res.status(201).json({message: "Item deleted successfully"});
        
    } catch (error){
        console.error("Error deleting item: ", error);
        res.status(500).json({error: "Failed to delete item"});
    }
}
