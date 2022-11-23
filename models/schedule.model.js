const sql = require("./db.js");

const Schedule = function (schedule) {
    this.id = schedule.id
    this.calendar_id = schedule.calendar_id;
    this.year = schedule.year;
    this.month = schedule.month;
    this.day = schedule.day;
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
    sql.query('INSERT INTO schedule(calendar_id, year, month, day) VALUES (?,?,?,?)',[data.calendar_id, data.year, data.month, data.day], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Schedule.checkSchedule = (data,result) => {
    sql.query('SELECT date FROM schedule where (calendar_id = ?)',[data.calendar_id], (err, res) => {
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