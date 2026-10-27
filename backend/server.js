const express = require("express"); 
const cors = require('cors'); 
const { db } = require('./db') 

const app = express(); 
const PORT = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
    res.json({ "Message": "Hello World"})
}) 
app.post("/api/todos", async (req, res) => {
    try {
        const result = await db.query("INSERT INTO todos(text) VALUES($1) RETURNING *", [req.body.text]); 
        res.status(201).json(result.rows[0]) 
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: "COULD NOT SAVE TODO"})
    }
}); 

app.delete("/api/todos", async (req, res) => {
    try {
        const result = await db.query("DELETE FROM todos WHERE id = $1 RETURNING *", [req.body.id]);  
        res.status(201).json(result.rows[0]) 
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "COULD NOT DELETE"})
    }
})
app.get("/api/todos", async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM todos"); 
        res.status(200).json(result.rows) 
    } catch (error) {
        console.error(error) 
        res.status(500).json({ error: "FAILED TO LOAD"})
    }
})
app.patch('/api/todos', async (req, res) => {
    try {
        const result = await db.query("UPDATE todos SET completed = NOT completed WHERE id = $1 RETURNING *", [req.body.id]); 
        res.status(200).json(result.rows) 
    } catch(error) {
        console.error(error) 
        res.status(500).json({ error: "FAILED TO MARK"}) 
    }
})
app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`) 
})