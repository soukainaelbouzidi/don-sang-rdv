const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'elbouzidi',
    password: 'SoukaElbouzidi@2002',
    database: 'client'
});

module.exports = connection;