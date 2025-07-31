import * as categoryQueries from "../db/queries.js";

export const getCategories = async (req, res)=>{
    try {
        const categories = await categoryQueries.getCategories();
        res.json(categories);
    } catch (error) {
        console.error("Error fetching categories: ",error);
        res.status(500).json({error: "Failed to fetch categories"});
    }
}

export const getTypes = async (req, res)=>{
    try {
        const types = await categoryQueries.getTypes();
        res.json(types);
    } catch (error) {
        console.error("Error fetching types: ",error);
        res.status(500).json({error: "Failed to fetch types"});
    }
}