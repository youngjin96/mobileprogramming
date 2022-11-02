const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : '10.223.116.186',
    user     : 'donghyun',
    password : '1234',
    port     : '3306',
    database : 'Shalendar'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
  }
  console.log('Connected to database.');
});

module.exports = connection;