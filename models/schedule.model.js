const sql = require("./db.js");

const Schedule = function (schedule) {
    this.id = schedule.id
    this.calendar_id = schedule.calendar_id;
    this.year = schedule.year;
    this.month = schedule.month;
    this.day = schedule.day;
};

Schedule.createSchedule = (data, result) => {
    sql.query('DELETE FROM schedule WHERE calendar_id = ?', [data.calendar_id]);
    var a = JSON.parse(data.data);
    var end_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var return_date = [];
    var month_record = [];
    var mask = [];

    for (let i = 0; i < a.length; i++) {
        sql.query('INSERT INTO schedule(calendar_id, year, month, day) VALUES (?,?,?,?)', [data.calendar_id, a[i].year, a[i].month, a[i].day], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
        });
        month_record.push(parseInt(a[i].month));
        mask.push(JSON.parse('{"year": "' + parseInt(a[i].year) + '", "month": "' + parseInt(a[i].month) + '", "day": "' + parseInt(a[i].day) + '"}'));
    }

    const set = new Set(month_record); // 중복제거
    month_record = [...set];

    for (var i = 0; i < month_record.length; i++) // 달력 생성
        for (var j = 0; j < end_month[month_record[i] - 1]; j++)
            return_date.push(JSON.parse('{"year": "' + a[0].year + '", "month": "' + month_record[i] + '", "day": "' + (j + 1) + '"}'));

    mask = mask.sort(function(a, b) {
        return a.day - b.day;
    })

    for (var i = 0; i < return_date.length; i++) { // 유저가 선택한 날짜 제거
        for (var j = 0; j < mask.length; j++) {
            if (return_date[i].month == mask[j].month && return_date[i].day == mask[j].day)
                return_date.splice(i, 1);
        }
    }
    result(null, return_date);
};

Schedule.checkSchedule = (calendarId, result) => {
    sql.query('SELECT * FROM schedule where (calendar_id = ?)', [calendarId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Schedule;