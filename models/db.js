const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : 'dudwls11!!',
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