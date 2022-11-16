const sql = require("./db.js");
const microTime = require("microtime")

var id = microTime.now()

const Calendar = function (calendar) {
    this.id = calendar.id;  
    this.user_id = calendar.user_id;
    this.name = calendar.name;
    this.person_num = calendar.person_num;
};
const microTime = require('microtime');
var id = microTime.now();

console.log(id);
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
<<<<<<< HEAD
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


=======
    });
};
>>>>>>> 2fe1572edd88975468556c5b5bde008ec96047a8
module.exports = Calendar;