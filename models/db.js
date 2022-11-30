const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'donghyun',
    password : '1234',
    port     : '3306',
    database : 'Shalendar'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
  }
  console.log('Connected to database.');
});

module.exports = connection;