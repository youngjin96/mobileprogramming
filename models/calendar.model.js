const sql = require("./db.js");
const microTime = require("microtime");

const Calendar = function (calendar) {
    this.id = calendar.id;  
    this.user_id = calendar.user_id;
    this.name = calendar.name;
    this.person_num = calendar.person_num;
};

// 캘린더 생성
Calendar.create = (data, result) => {   
    sql.query('INSERT INTO calendar (user_id, name, person_num) VALUES (?, ?, ?)', [data.user_id, data.name, data.person_num], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        sql.query('SELECT * from calendar WHERE name = ?', [data.name], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            } else {
                console.log(res);
                result(null, res);
            }
        })
    });
};

// 전체 캘린더 가져오기
Calendar.getCalendars = (userId, result) => {
    var calendars = [];
    sql.query('SELECT * from calendar WHERE user_id = ?', [userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            for(let i = 0; i < Object.keys(res).length; i++) {
                calendars.push(res[i]);
            }
            result(null, calendars);
        }
    });
};


// 캘린더 삭제
Calendar.deleteCalendar = (name, result) => {
    sql.query('delete from calendar WHERE name = ?', [name], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Calendar;