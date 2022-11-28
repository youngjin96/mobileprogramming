const sql = require("./db.js");
const microTime = require('microtime');

const Calendar = function (calendar) {
    this.id = calendar.id;  
    this.user_id = calendar.user_id;
    this.name = calendar.name;
    this.person_num = calendar.person_num;
};

// 캘린더 생성
Calendar.create = (data, result) => {
    var id = microTime.now();
    id = id.toString();
    id = id.slice(-6);    
    sql.query('INSERT INTO calendar (id, user_id, name, person_num) VALUES (?, ?, ?, ?)', [id, data.user_id, data.name, data.person_num], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// 캘린더 이름 가져오기
Calendar.getCalendar = (userId, result) => {
    var calendars = [];
    sql.query('SELECT name from calendar WHERE user_id = ?', [userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            for(let i = 0; i < Object.keys(res).length; i++) {
                calendars.push(res[i].name);
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