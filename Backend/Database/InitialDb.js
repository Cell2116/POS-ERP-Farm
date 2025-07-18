const pool = require('../Database/db');

const createDatabase = async () => {
  try {
    // Drop tables in reverse order of creation to respect foreign key constraints
    await pool.query(`DROP TABLE IF EXISTS purchasingtable`);
    await pool.query(`DROP TABLE IF EXISTS tablegoods`);
    await pool.query(`DROP TABLE IF EXISTS userslogin`);

    // Create userslogin table
    await pool.query(`
      CREATE TABLE userslogin (
        ID SERIAL PRIMARY KEY,
        NAME VARCHAR(255) NOT NULL,
        EMAIL VARCHAR(255) NOT NULL,
        PASSWORD VARCHAR(255) NOT NULL,
        ROLES VARCHAR(255) NOT NULL,
        PHONE VARCHAR(255) NOT NULL,
        CHECKBOX BOOLEAN NOT NULL,
        BALANCE INT NOT NULL
      )
    `);

    // Create tablegoods table
    await pool.query(`
      CREATE TABLE tablegoods (
        ID SERIAL PRIMARY KEY,
        PRODUCTNAME VARCHAR(255) UNIQUE NOT NULL,
        CATEGORY VARCHAR(255) NOT NULL,
        EXPIRYDATE DATE NOT NULL,
        STOCK INT NOT NULL,
        PRICE INT NOT NULL
      )
    `);

    // Create purchasingtable table
    await pool.query(`
      CREATE TABLE purchasingtable (
        IDPURCHASING SERIAL PRIMARY KEY,
        PRODUCTID INT REFERENCES tablegoods(ID),
        IDUSER INT REFERENCES userslogin(ID),
        PRICE INT NOT NULL,
        QUANTITY INT NOT NULL,
        COURIER VARCHAR(255) NOT NULL,
        ADDRESS VARCHAR(255) NOT NULL,
        STATUS VARCHAR(255) NOT NULL
      )
    `);

    // Insert data into tablegoods
    await pool.query(`
      INSERT INTO tablegoods (PRODUCTNAME, CATEGORY, EXPIRYDATE, STOCK, PRICE) VALUES
        ('Organic Rice', 'Grains', '2025-12-31', 100, 25000),
        ('Fresh Corn', 'Vegetables', '2025-08-15', 200, 8000),
        ('Free-range Eggs', 'Dairy', '2025-07-10', 50, 30000),
        ('Sweet Potato', 'Vegetables', '2025-09-20', 120, 12000),
        ('Natural Honey', 'Condiments', '2026-01-01', 80, 40000),
        ('Fresh Milk', 'Dairy', '2025-07-05', 60, 18000),
        ('Red Chili', 'Vegetables', '2025-08-01', 150, 9000),
        ('Brown Sugar', 'Sweeteners', '2026-03-15', 90, 15000)
    `);

    console.log("Database and tables created successfully.");
  } catch (e) {
    console.error("DB Error:", e);
    throw e;
  }
};

module.exports = createDatabase;