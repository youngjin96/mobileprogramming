const sql = require("./db.js");

const Schedule = function (schedule) {
    this.id = schedule.id
    this.calendar_id = schedule.calendar_id;
    this.year = schedule.year;
    this.month = schedule.month;
    this.day = schedule.day;
};

Schedule.createSchedule = (data,result) => {
    sql.query('DELETE FROM schedule WHERE calendar_id = ?', [data.calendar_id]);
    var a = JSON.parse(data.data);
    console.log(a);
    for (let i = 0; i < a.length; i++){
        sql.query('INSERT INTO schedule(calendar_id, year, month, day) VALUES (?,?,?,?)',[data.calendar_id, a[i].year, a[i].month, a[i].day], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
        });
    }
};

Schedule.checkSchedule = (calendarId,result) => {
    sql.query('SELECT * FROM schedule where (calendar_id = ?)',[calendarId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Schedule;