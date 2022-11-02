const sql = require("./db.js");

const Calendar = function (calendar) {
    this.id = calendar.id;
    this.user_id = calendar.user_id;
    this.name = calendar.name;
    this.person_num = calendar.person_num;
};

const microTime = require('microtime');

Calendar.createtable = result => { 
    sql.query('CREATE TABLE calendar (id INT AUTO_INCREMENT PRIMARY KEY, user_id VARCHAR(28), name VARCHAR(15), person_num INT)', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Calendar.inserttable = result => { 
    sql.query('INSERT INTO calendar (id, user_id, name, person_num) VALUES (, "12245", "cal2", "4")', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

Calendar.calendarsearch = result => {
    sql.query('SELECT * from calendar', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};

module.exports = Calendar;