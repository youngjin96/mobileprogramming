const sql = require("./db.js");

const Schedule = function (schedule) {
    this.id = schedule.id
    this.calendar_id = schedule.calendar_id;
    this.date = schedule.date;
    this.name = schedule.schedule;
};
const microTime = require('microtime');
var id = microTime.now();
Schedule.createScheduleTable = result => { // 캘린더 테이블 크레이티브
    sql.query('CREATE TABLE schedule (id VARCHAR(20) PRIMARY KEY, calendar_id VARCHAR(20), date VARCHAR(15))', (err, res) => {
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
    sql.query('INSERT INTO schedule(id, calendar_id, date) VALUES (?,?,?)',[id, data.calendar_id, data.date], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Schedule.checkSchedule = (data,result) => {
    sql.query('SELECT date FROM schedule where calendar_id = ?',[data.calendar_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });
};

Schedule.deleteSchedule = (data,result) => { // delete schedule
    
    sql.query('delete From schedule where (calendar_id = ? and date = ? )',[data.calendar_id, data.date], (err, res) => 
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