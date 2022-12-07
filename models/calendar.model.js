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
    var nickName;
    sql.query('SELECT * FROM user WHERE id = ?', [data.user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        nickName = res[0].nick_name;
        sql.query('INSERT INTO calendar (user_id, name, person_num) VALUES (?, ?, ?)', [data.user_id, data.calendar_name, 1], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            sql.query('SELECT * FROM calendar WHERE (name = ? AND user_id = ?)', [data.calendar_name, data.user_id], (err, res1) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                } else {
                    sql.query('INSERT INTO share (nick_name, user_id, calendar_id, position) VALUES (?,?,?,?)', [nickName, data.user_id, res1[0].id, "host"], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        result(null, res1);
                    });
                }
            });
        });
    });
};

// 유저의 캘린더 모두 가져오기
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
Calendar.deleteCalendar = (data, result) => {
    sql.query('SELECT position FROM share WHERE (calendar_id = ? AND user_id = ? )',[data.calendarId, data.userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else if (res[0].position == "guest") {
            result(null, "1");
        } else {
            // 유저의 포지션이 host일 때만 삭제
            sql.query('DELETE FROM share WHERE calendar_id = ?', [data.calendarId], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                sql.query('DELETE from calendar WHERE calendar_id = ?', [data.calendarId], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    result(null, "2");
                });
            });
        }
    });
};

module.exports = Calendar;