const bcrypt = require("bcrypt");
const pool = require("../Database/db");

exports.register = async (req, res) => {
  try {
    const { name, email, password, roles, phone, checkbox } = req.body;

    const trimUsername = name.trim();
    const trimEmail = email.trim();
    const trimPassword = password.trim();

    const hashedPassword = await bcrypt.hash(trimPassword, 10);
    const user = await findUser(trimEmail);

    if (user.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    const ID = await randomID();

    const query = `
      INSERT INTO userslogin (ID, NAME, EMAIL, PASSWORD, ROLES, PHONE, CHECKBOX)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    const values = [ID, trimUsername, trimEmail, hashedPassword, roles, phone, checkbox];
    console.log("Data: ", values);

    await pool.query(query, values);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

exports.login = async (req, res) => {
  try{
    const {email, password} = req.body;
    console.log("Login request received:", req.body);
    const trimEmail = email.trim();
    const trimPassword = password.trim();

    const user = await findUser(trimEmail);

    if (user.length === 0) {
      return res.status(405).json({ message: "usernotfound" });
    }else{
      const isMatch = await bcrypt.compare(trimPassword, user[0].password);
      if(!isMatch) {
        return res.status(401).json({ message: "invalid" });
      }else{
        res.status(200).json({ message: "success", user });
      }
    }
  }
  catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const findUser = async (email)=> {
  try{
    await pool.query(`
      CREATE TABLE IF NOT EXISTS userslogin(
        ID INT PRIMARY KEY, 
        NAME VARCHAR(255) NOT NULL,
        EMAIL VARCHAR(255) NOT NULL,
        PASSWORD VARCHAR(255) NOT NULL,
        ROLES VARCHAR(255) NOT NULL,
        PHONE VARCHAR(255) NOT NULL,
        CHECKBOX BOOLEAN NOT NULL
        )
      `);    
      const { rows } = await pool.query(`
        SELECT * FROM userslogin
        where email = $1
        `, [email]);
      
        return rows;
    }
    catch (error) {
      console.error("Error checking user:", error);
      throw error;
    }
}

const randomID = async () => {
  let ID;
  let find;

  do{
    ID = Math.floor(Math.random() * 1000);
    find = await pool.query(`
      SELECT * FROM userslogin
      WHERE ID = $1
    `, [ID]);
  }while(find.rows.length > 0);;

  return ID;
}

