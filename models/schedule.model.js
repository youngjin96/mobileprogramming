const sql = require("./db.js");
const microTime = require('microtime');

const Schedule = function (schedule) {
    this.id = schedule.id
    this.calendar_id = schedule.calendar_id;
    this.year = schedule.year;
    this.month = schedule.month;
    this.day = schedule.day;
};

Schedule.createScheduleTable = result => { // 캘린더 테이블 크레이티브
    sql.query('CREATE TABLE schedule (id VARCHAR(20) PRIMARY KEY, calendar_id VARCHAR(20), year VARCHAR(15), month VARCHAR(15), day VARCHAR(15))', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Schedule.scheduleSerch = result => {
    sql.query('SELECT * FROM schedule', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Schedule.createSchedule = (data,result) => {
    var id = microTime.now();
    sql.query('INSERT INTO schedule(id, calendar_id, year, month, day) VALUES (?,?,?,?,?)',[id, data.calendar_id, data.year, data.month, data.day], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Schedule.checkSchedule = (calendarId, result) => {
    var date = [];
    sql.query('SELECT * FROM schedule WHERE (calendar_id = ?)',[calendarId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } else {
            for(let i = 0; i < Object.keys(res).length; i++) {
                date.push(res[i]);
            }
            result(null, date);
        }
    });
};

Schedule.deleteSchedule = (data,result) => { // delete schedule  
    sql.query('delete From schedule where (calendar_id = ? and year = ?  and month = ? and day = ? )',[data.calendar_id, data.year, data.month, data.day], (err, res) => 
    {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
module.exports = Schedule;