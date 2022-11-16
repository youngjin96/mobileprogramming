const sql = require("./db.js");
const microTime = require("microtime")

const Calendar = function (calendar) {
    this.id = calendar.id;
    this.user_id = calendar.user_id;
    this.name = calendar.name;
    this.person_num = calendar.person_num;
};

var id = microTime.now();

//INSERT INTO users(id, email, nick_name, birth) VALUES ("1234", "dhsh1214@naver.com", "hyun", "2001-04-12")
//https://sol2gram.tistory.com/28 - 중복xid만들기
//var sql = "CREATE TABLE hz_member (mb_id INT AUTO_INCREMENT PRIMARY KEY, mb_name VARCHAR(255), mb_level VARCHAR(255))";

//AUTO_INCREMENT
Calendar.createCalendarTable = result => { // 캘린더 테이블 크레이티브
    sql.query('CREATE TABLE calendar (id VARCHAR(20) PRIMARY KEY, user_id VARCHAR(28), name VARCHAR(15), person_num INT)', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
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