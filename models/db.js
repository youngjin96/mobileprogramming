const mysql = require('mysql');


const connection = mysql.createConnection({
  host     : '10.223.116.186',
  user     : 'juan',
  password : '1234',
  port     : '3306',
  database : 'Shalendar'
});

/*
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zxc123',
  port     : '3306',
  database : 'my_db'
});*/

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
  }
  console.log('Connected to database.');
});

module.exports = connection;