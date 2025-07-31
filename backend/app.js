import express from "express";
import env from "dotenv";
import cors from "cors";
import itemRouter from "./routes/items.js";
import categoryRouter from "./routes/categories.js"

env.config();
const app = express();
const port = process.env.SERVER_PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/items', itemRouter);
app.use('/api/categories', categoryRouter);


app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({error: "Something went wrong"});
});

app.use((req, res)=>{
    res.status(404).json({error: "Route Not Found"});
});

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});