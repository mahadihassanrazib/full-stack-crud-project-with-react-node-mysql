//importing the mysql2/promise for using async await in conenction function and in querys
const mysql = require("mysql2/promise");

//the async await function which connects to the database using the credentials in the .env files
const ConnectDB = async () => {
  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: process.env.DB_WAITFORCONNECTIONS,
    connectionLimit: process.env.DB_CONNECTIONLIMIT,
    queueLimit: process.env.DB_QUEUELIMIT
  });

  // async await query which creates the database if it doesn't exist
  await pool.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DATABASE}\``
  );
  console.log(`Database ${process.env.DB_DATABASE} created or already exists.`);

  // async await query which changes to the pool's database to the newly created database
  await pool.query(`USE \`${process.env.DB_DATABASE}\``);
  console.log(`Switched to database ${process.env.DB_DATABASE}`);

  // async await query which creates the 'users' table if it doesn't exist and creates table for id, name, email
  await pool.query(`CREATE TABLE IF NOT EXISTS \`${process.env.DB_TABLENAME}\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  console.log(`${process.env.DB_TABLENAME} table created or already exists.`);
  // returning pool to further add querys in the database we did till now
  return pool;
};

//exporting the function
module.exports = ConnectDB;
