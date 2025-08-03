# Library Inventory Application

A library inventory management system built with React.js frontend and Node.js/Express backend with PostgreSQL database.

## Features

- **Item Management**: View, add, and update library items
- **Category Filtering**: Filter items by categories (Books, Music, Video Games, DVDs, etc.)
- **Demand Rating System**: 1-5 scale indicating how much stock to keep
- **Stock Status**: Visual indicators for stock levels based on demand
- **Flexible Attributes**: Support for different item types with custom attributes
- **Responsive Design**: Modern UI built with Bootstrap

## Tech Stack

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **CORS** enabled for frontend communication
- **Postman** for testing the api routes

### Frontend
- **React.js** with hooks
- **Bootstrap 5** for styling
- **React Bootstrap** components
- **Vite** for development and building


## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- npm or yarn package manager

### Database Setup

1. Create a PostgreSQL database named `library_inventory`
2. Create a `.env` file in the `backend` directory with your database credentials:

```env
DB_HOST=localhost
DB_USER=your_username
DB_DATABASE=library_inventory
DB_PASSWORD=your_password
DB_PORT=5432
SERVER_PORT=3000
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Populate the database with tables and sample data:
```bash
npm run db
```

4. Start the development server:
```bash
npm run dev
```

The backend will be running on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be running on `http://localhost:5173`

## API Endpoints

### Items
- `GET /api/items` - Get all items
- `GET /api/items/:id` - Get item by ID
- `GET /api/items/category/:categoryId` - Get items by category
- `POST /api/items` - Create new item
- `PUT /api/items/:id` - Update item
- `DELETE /api/items/:id` - Delete item
- `PATCH /api/items/:id/quantity` - Update item quantity

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/types` - Get all types

## Usage

### Viewing Items
- Browse all items in the main view
- Use the category filter on the left to filter by category
- Click "View Details" on any item to see detailed information

### Adding Items
- Click "Add Item" in the navigation bar
- Fill out the form with item details
- Select categories and types as needed
- Add custom attributes (author, platform, etc.)

### Managing Stock
- View stock status indicators (Out of Stock, Low Stock, etc.)
- Update quantities from the item detail view
- Demand rating helps determine recommended stock levels
