const sql = require("./db.js");
const microTime = require("microtime")

var id = microTime.now()

const Calendar = function (calendar) {
    this.id = calendar.id;
    this.user_id = calendar.user_id;
    this.name = calendar.name;
    this.person_num = calendar.person_num;
};

Calendar.createCalendar = (data, result) => {
    sql.query('INSERT INTO calendar (id, user_id, name, person_num) VALUES (?, ?, ?, ?)', [id, data.user_id, data.name, data.person_num], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Calendar.deleteCalendar = (data, result) => {
    sql.query('delete from calendar WHERE (id=? AND user_id=?)', [data.id, data.user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};


Calendar.searchCalendar = result => {
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