const express = require('express');
const router = express.Router();
const pool = require('../Database/db');


router.get('/listgood', async(req,res)=>{
  try{
    const result = await pool.query(`
      SELECT * 
      FROM tablegoods
      `);
    res.json(result);
  }
  catch (err){
    console.log("Can't fetch data");
    res.status(500).json({error: err.message});
  }
})

router.get('/history', async(req,res)=>{
  try{
    const result = await pool.query(`
      SELECT * FROM purchasingtable
      `);
    res.json(result);
  }
  catch (err){
    console.log("Data history not found");
    res.status(404).json({ error : err.message });
  }
})

router.post ('/payment',async(req, res)=>{
  try{
    const {productname, iduser, price, quantity, status, courier, address} = req.body;
    const idpurchasing = randomIDPurchasing();
    await pool.query(`
      INSERT INTO purchasingtable (PRODUCTNAME, IDPURCHASING, IDUSER, PRICE, QUANTITY, COURIER, ADDRESS, STATUS) VALUES ($1, $2, $3, $4, $5, $6)
      `, [productname, idpurchasing, iduser, price, quantity, courier, address, status]);
    res.json({ message: "Data has been inputed", idpurchasing});
    }
  catch (err){
    console.log("Post Data error")
    res.status(200).json({ error: err.message});
  }
})

async function randomIDPurchasing(){
  let newID;
  let exist = true;
  
  while(exist){
    newID = Math.floor(10000000 + Math.random() * 900000);
    const result = await pool.query(`SELECT IDPURCHASING FROM purchasingtable WHERE IDPURCHASING = $1`, [newID]);
    exist = result.rows.length > 0;
  }
  return newID;
}


module.exports = router;