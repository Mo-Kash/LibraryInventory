import pool from "./pool.js";

const createTables = async ()=>{
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS categories(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                description TEXT
            ) 
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS types(
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                description TEXT
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS items(
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT,
                quantity INTEGER DEFAULT 0,
                price DECIMAL(10, 2) DEFAULT 0.00,
                demand_rating INTEGER DEFAULT 1 CHECK(demand_rating>=1 AND demand_rating<=5),
                attributes JSONB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS item_categories(
                item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
                category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
                PRIMARY KEY (item_id, category_id)
            )    
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS item_types(
                item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
                type_id INTEGER REFERENCES types(id) ON DELETE CASCADE,
                PRIMARY KEY (item_id, type_id)
            )    
        `);

        console.log("Tables created successfully");
        
    } catch (error) {
        console.error("Error creating tables: ",error);
        throw error;
    }
}

const insertInitData = async()=>{
    try {
        const categories = [
            { name: 'Books', description: 'All types of books' },
            { name: 'Novels', description: 'Fictional and non-fictional novels' },
            { name: 'Fiction', description: 'Fictional literature' },
            { name: 'Non-fiction', description: 'Non-fictional literature' },
            { name: 'Comics', description: 'Comic books and graphic novels' },
            { name: 'Music', description: 'All types of music media' },
            { name: 'Albums', description: 'Music albums' },
            { name: 'Singles', description: 'Music singles' },
            { name: 'Video Games', description: 'Video games for various platforms' },
            { name: 'DVDs', description: 'DVD media' },
            { name: 'Movies', description: 'Movie DVDs' },
            { name: 'TV Shows', description: 'TV show DVDs' }
        ];

        const types = [
            { name: 'Paperback', description: 'Paperback books' },
            { name: 'Hardcover', description: 'Hardcover books' },
            { name: 'E-book', description: 'Electronic books' },
            { name: 'CD', description: 'Compact discs' },
            { name: 'Vinyl', description: 'Vinyl records' },
            { name: 'Digital', description: 'Digital downloads' },
            { name: 'PlayStation', description: 'PlayStation games' },
            { name: 'Xbox', description: 'Xbox games' },
            { name: 'Nintendo', description: 'Nintendo games' },
            { name: 'PC', description: 'PC games' },
            { name: 'Blu-ray', description: 'Blu-ray discs' },
            { name: 'DVD', description: 'DVD discs' }
        ];

        const items = [
            {
                name: 'The Great Gatsby',
                description: 'Classic American novel by F. Scott Fitzgerald',
                quantity: 15,
                price: 12.99,
                demand_rating: 4,
                attributes: { author: 'F. Scott Fitzgerald', isbn: '978-0743273565', pages: 180 }
            },
            {
                name: 'Batman: The Dark Knight Returns',
                description: 'Iconic Batman graphic novel by Frank Miller',
                quantity: 8,
                price: 19.99,
                demand_rating: 5,
                attributes: { author: 'Frank Miller', illustrator: 'Frank Miller', pages: 224 }
            },
            {
                name: 'Abbey Road',
                description: 'The Beatles final studio album',
                quantity: 12,
                price: 24.99,
                demand_rating: 4,
                attributes: { artist: 'The Beatles', year: 1969, tracks: 17 }
            },
            {
                name: 'The Legend of Zelda: Breath of the Wild',
                description: 'Open-world action-adventure game',
                quantity: 6,
                price: 59.99,
                demand_rating: 5,
                attributes: { developer: 'Nintendo', platform: 'Nintendo Switch', genre: 'Action-Adventure' }
            },
            {
                name: 'The Shawshank Redemption',
                description: 'Classic drama film based on Stephen King novella',
                quantity: 10,
                price: 14.99,
                demand_rating: 3,
                attributes: { director: 'Frank Darabont', year: 1994, runtime: '142 minutes' }
            },
            {
                name: 'The Batman',
                description: '2022 neo-noir superhero film featuring a younger Batman',
                quantity: 9,
                price: 16.99,
                demand_rating: 4,
                attributes: { director: 'Matt Reeves', year: 2022, runtime: '176 minutes' }
            },
            {
                name: 'The Metamorphosis',
                description: 'Surreal novella by Franz Kafka about human alienation',
                quantity: 20,
                price: 9.99,
                demand_rating: 4,
                attributes: { author: 'Franz Kafka', isbn: '978-0553213690', pages: 201 }
            },
            {
                name: 'Grand Theft Auto V',
                description: 'Open-world action-adventure game set in Los Santos',
                quantity: 7,
                price: 29.99,
                demand_rating: 5,
                attributes: { developer: 'Rockstar Games', platform: 'Multi-platform', genre: 'Action-Adventure' }
            },
            {
                name: 'OK Computer',
                description: 'Seminal 1997 alternative rock album by Radiohead',
                quantity: 14,
                price: 21.99,
                demand_rating: 5,
                attributes: { artist: 'Radiohead', year: 1997, tracks: 12 }
            },
            {
                name: 'Invincible: Compendium 1',
                description: 'Massive collection of the first 47 issues of *Invincible*',
                quantity: 5,
                price: 64.99,
                demand_rating: 4,
                attributes: { author: 'Robert Kirkman', illustrator: 'Cory Walker & Ryan Ottley', pages: 1114 }
            }
        ];

        for(const category of categories){
            await pool.query(
                `INSERT INTO categories(name, description) VALUES($1, $2) ON CONFLICT (name) DO NOTHING`,
                [category.name, category.description]
            );
        }

        for(const type of types){
            await pool.query(
                `INSERT INTO types(name, description) VALUES($1, $2) ON CONFLICT (name) DO NOTHING`,
                [type.name, type.description]
            );
        }

        for(const item of items){
            const result = await pool.query(
                `INSERT INTO items(name, description, quantity, price, demand_rating, attributes) VALUES($1, $2, $3, $4, $5, $6) RETURNING id`,
                [item.name, item.description, item.quantity, item.price, item.demand_rating, JSON.stringify(item.attributes)]
            );

            const itemId = result.rows[0].id;

            if (item.name.includes('Gatsby')) {
                await pool.query(
                    'INSERT INTO item_categories (item_id, category_id) SELECT $1, id FROM categories WHERE name IN ($2, $3, $4)', 
                    [itemId, 'Books', 'Novels', 'Fiction']
                );
                await pool.query(
                    'INSERT INTO item_types (item_id, type_id) SELECT $1, id FROM types WHERE name IN ($2, $3)', 
                    [itemId, 'Paperback', 'Hardcover']
                );
            } 
            
            else if (item.name.includes('The Dark Knight Returns')) {
                await pool.query(
                    'INSERT INTO item_categories (item_id, category_id) SELECT $1, id FROM categories WHERE name IN ($2)', 
                    [itemId, 'Comics']
                );
                await pool.query(
                    'INSERT INTO item_types (item_id, type_id) SELECT $1, id FROM types WHERE name IN ($2, $3)', 
                    [itemId, 'Paperback', 'Hardcover']
                );
            } 
            
            else if (item.name.includes('Abbey Road')) {
                await pool.query(
                    'INSERT INTO item_categories (item_id, category_id) SELECT $1, id FROM categories WHERE name IN ($2, $3)', 
                    [itemId, 'Music', 'Albums']
                );
                await pool.query(
                    'INSERT INTO item_types (item_id, type_id) SELECT $1, id FROM types WHERE name IN ($2, $3)', 
                    [itemId, 'CD', 'Vinyl']
                );
            } 
            
            else if (item.name.includes('Zelda')) {
                await pool.query(
                    'INSERT INTO item_categories (item_id, category_id) SELECT $1, id FROM categories WHERE name IN ($2)', 
                    [itemId, 'Video Games']
                );
                await pool.query(
                    'INSERT INTO item_types (item_id, type_id) SELECT $1, id FROM types WHERE name IN ($2)', 
                    [itemId, 'Nintendo']
                );
            } 
            
            else if (item.name.includes('Shawshank')) {
                await pool.query(
                    'INSERT INTO item_categories (item_id, category_id) SELECT $1, id FROM categories WHERE name IN ($2, $3)', 
                    [itemId, 'DVDs', 'Movies']
                );
                await pool.query(
                    'INSERT INTO item_types (item_id, type_id) SELECT $1, id FROM types WHERE name IN ($2, $3)', 
                    [itemId, 'DVD', 'Blu-ray']
                );
            } 
            
            else if (item.name.includes('The Batman')) {
                await pool.query(
                    'INSERT INTO item_categories (item_id, category_id) SELECT $1, id FROM categories WHERE name IN ($2, $3)', 
                    [itemId, 'DVDs', 'Movies']
                );
                await pool.query(
                    'INSERT INTO item_types (item_id, type_id) SELECT $1, id FROM types WHERE name IN ($2, $3)', 
                    [itemId, 'DVD', 'Blu-ray']
                );
            } 
            
            else if (item.name.includes('Metamorphosis')) {
                await pool.query(
                    'INSERT INTO item_categories (item_id, category_id) SELECT $1, id FROM categories WHERE name IN ($2, $3, $4)', 
                    [itemId, 'Books', 'Classics', 'Fiction']
                );
                await pool.query(
                    'INSERT INTO item_types (item_id, type_id) SELECT $1, id FROM types WHERE name IN ($2, $3)', 
                    [itemId, 'Paperback', 'Hardcover']
                );
            } 
            
            else if (item.name.includes('Grand Theft Auto')) {
                await pool.query(
                    'INSERT INTO item_categories (item_id, category_id) SELECT $1, id FROM categories WHERE name IN ($2)', 
                    [itemId, 'Video Games']
                );
                await pool.query(
                    'INSERT INTO item_types (item_id, type_id) SELECT $1, id FROM types WHERE name IN ($2, $3)', 
                    [itemId, 'PlayStation', 'Xbox']
                );
            } 
            
            else if (item.name.includes('OK Computer')) {
                await pool.query(
                    'INSERT INTO item_categories (item_id, category_id) SELECT $1, id FROM categories WHERE name IN ($2, $3)', 
                    [itemId, 'Music', 'Albums']
                );
                await pool.query(
                    'INSERT INTO item_types (item_id, type_id) SELECT $1, id FROM types WHERE name IN ($2, $3)', 
                    [itemId, 'CD', 'Vinyl']
                );
            } 
            
            else if (item.name.includes('Invincible')) {
                await pool.query(
                    'INSERT INTO item_categories (item_id, category_id) SELECT $1, id FROM categories WHERE name IN ($2)', 
                    [itemId, 'Comics']
                );
                await pool.query(
                    'INSERT INTO item_types (item_id, type_id) SELECT $1, id FROM types WHERE name IN ($2, $3)', 
                    [itemId, 'Paperback', 'Compendium']
                );
            }
        }

        console.log("Successfully added initial data");
    } catch (error) {
        console.error("Error inserting initial data: ", error);
        throw error;
    }
}

async function main(){
    console.log("Seeding...");
    try {
        await createTables();
        await insertInitData();
        console.log("Database Setup Completed Successfully");
        process.exit(0);
    } catch (error) {
        console.error("Database Setup Failed", error);
        process.exit(1);
    }
}

main();