const mysql = require('mysql');


//Sprawdz czy creaceConnection zadziała
const db = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'stasz_user'
});

module.exports = db;
