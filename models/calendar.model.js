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


Calendar.getName = (data, result) => {
    var calendar_name = null;
    sql.query('SELECT name, user_id from calendar WHERE id = ?', [data.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length == 0) {
            result(null, "존재하지 않는 캘린더입니다.");
        }
        else {
            calendar_name = res[0].name;
            sql.query('SELECT nick_name from user WHERE id = ?', [res[0].user_id], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                res[0].name = calendar_name;
                result(null, res);  
            });
        }
        
    });
};


module.exports = Calendar;