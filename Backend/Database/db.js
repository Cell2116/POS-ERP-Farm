const { Pool } = require('pg');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ 
  path: path.resolve(__dirname, '../.env') 
});

const db = new Pool ({
  user : process.env.DB_USER,
  host : process.env.DB_HOST,
  database : process.env.DB_NAME,
  password : process.env.DB_PASSWORD,
  port : parseInt(process.env.DB_PORT),
  ssl: false
})

db.connect((err, client, release)=>{
  if(err){
    console.log("Error acquiring client", err.stack);
  }else{
    console.log("Connected to database");
    release();
  }
});

module.exports = db;


