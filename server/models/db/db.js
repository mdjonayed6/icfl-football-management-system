// db.js
const mysql = require('mysql');

// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host: 'localhost',
    user: `root`,
    password: ``,
    database: `icfl`
});

module.exports = connection;
