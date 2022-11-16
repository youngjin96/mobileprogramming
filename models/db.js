const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : '10.30.118.154',
    user     : 'donghyun',
    password : '1234',
    port     : '3306',
    database : 'Shalendar'
});

// const connection = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'design41',
//     database : 'my_db'
//   });


connection.connect((err) => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
  }
  console.log('Connected to database.');
});

module.exports = connection;