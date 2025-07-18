const express = require('express');
const pool = require('../Database/db');
const router = express.Router();

router.get('/', async(req, res) =>{
  try{
    const result = await pool.query(`
      SELECT * FROM userslogin
      `);
    res.status(202).json(result);
  }
  catch (err){
    console.log("Data not found/error");
    res.status(404).json({ error : err.message });
  }
})


module.exports = router; 