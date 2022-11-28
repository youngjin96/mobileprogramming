const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'zxc123',
    database : 'test_db'
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