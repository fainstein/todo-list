const mysql = require('mysql2');

// const connection = mysql.createConnection({
//     host: 'sql434.main-hosting.eu',
//     user: 'u206558025_nicofains',
//     password: 'Nicofains1123',
//     database: 'u206558025_todoclient'
// })

var pool  = mysql.createPool({
    connectionLimit : 10,
    host: 'sql434.main-hosting.eu',
    user: 'u206558025_nicofains',
    password: 'Nicofains1123',
    database: 'u206558025_todoclient'
  });

module.exports = pool;