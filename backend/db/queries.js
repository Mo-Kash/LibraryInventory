import pool from "./pool.js";


//*****CATEGORIES*****
export const getCategories = async ()=>{
    const query = 'SELECT * FROM categories ORDER BY id';
    const result = await pool.query(query);
    return result.rows;
}

export const getTypes = async ()=>{
    const query = 'SELECT * FROM types ORDER BY id';
    const result = await pool.query(query);
    return result.rows;
}


//*****ITEMS*****
//CREATE
export const addItem = async (itemData)=>{
    const {name, description, quantity, price, demand_rating, categories, types, attributes } = itemData;

    const query = `
        INSERT INTO items(name, description, quantity, price, demand_rating, attributes) 
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
    `;
    const result = await pool.query(query, [name, description, quantity, price, demand_rating, JSON.stringify(attributes)]);
    
    return result.rows[0];
}

//READ
export const getAllItems = async ()=>{
    const query = `
        SELECT i.*,
            array_agg(DISTINCT c.name) as categories,
            array_agg(DISTINCT t.name) as types
        FROM items i
        LEFT JOIN item_categories ic ON i.id = ic.item_id
        LEFT JOIN categories c ON ic.category_id = c.id
        LEFT JOIN item_types it ON i.id = it.item_id
        LEFT JOIN types t ON it.type_id = t.id
        GROUP BY i.id
        ORDER BY i.name
    `;
    const result = await pool.query(query);
    return result.rows;
}

export const getItemsByCategory = async (categoryId)=>{
    const query = `
        SELECT i.*,
            array_agg(DISTINCT c.name) as categories,
            array_agg(DISTINCT t.name) as types
        FROM items i
        JOIN item_categories ic ON i.id = ic.item_id
        LEFT JOIN categories c ON ic.category_id = c.id
        LEFT JOIN item_types it ON i.id = it.item_id
        LEFT JOIN types t ON it.type_id = t.id
        WHERE ic.category_id = $1
        GROUP BY i.id
        ORDER BY i.name
    `;

    const result = await pool.query(query, [categoryId]);
    return result.rows;
}

export const getItemById = async (id)=>{
    const query = `
        SELECT i.*,
            array_agg(DISTINCT c.name) as categories,
            array_agg(DISTINCT t.name) as types
        FROM items i
        LEFT JOIN item_categories ic ON i.id = ic.item_id
        LEFT JOIN categories c ON ic.category_id = c.id
        LEFT JOIN item_types it ON i.id = it.item_id
        LEFT JOIN types t ON it.type_id = t.id
        WHERE i.id = $1
        GROUP BY i.id
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0];
}

//UPDATE
export const updateItem = async (id, itemData)=>{
    const {name, description, quantity, price, demand_rating, categories, types, attributes} = itemData;

    const query = `
        UPDATE items
        SET name=$1, description=$2, quantity=$3, price=$4, demand_rating=$5, attributes=$6
        WHERE id=$7
        RETURNING *
    `;

    const result = await pool.query(query, [name, description, quantity, price, demand_rating, JSON.stringify(attributes), id]);
}

export const updateQuantity = async (id, quantity)=>{
    const query = `UPDATE items SET quantity=$1 WHERE id=$2 RETURNING *`;
    const result = await pool.query(query, [quantity, id]);
    return result.rows[0];
}


//DELETE
export const deleteItem = async (id)=>{
    const query = `DELETE FROM items WHERE id=$1 RETURNING *`;
    const result = await pool.query(query, [id]);
    return result.rows[0];
}