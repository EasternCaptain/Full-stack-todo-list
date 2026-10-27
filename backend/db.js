require('dotenv').config(); 
const { Pool } = require('pg'); 

const pool = new Pool({
    user: process.env.DB_PORT, 
    database: process.env.DB_DATABASE, 
    password: process.env.DB_PASSWORD, 
    port: Number(process.env.DB_PORT), 
    host: process.env.DB_HOST 
}) 

module.exports = { db: pool }