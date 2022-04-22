const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Nf4inst3iN',
    database: 'todomanager'
})

module.exports = connection;