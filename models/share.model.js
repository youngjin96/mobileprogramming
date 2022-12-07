const sql = require("./db.js");

const Share = function (share) {
    this.id = share.id
    this.calendar_id = share.calendar_id;
    this.friend_id = share.friend_id;
};

/** share 테이블에서 user_id 일치하는 calendar_id 가져와서
 *  calendar 테이블에서 id 일치하는 캘린더 데이터 가져오기
 */
Share.getShare = (userId, result) => {
    var calendars = [];
    var calendarIds = [];

    sql.query('SELECT calendar_id FROM share where user_id = ?', [userId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        for (let i = 0; i < Object.keys(res).length; i++) {
            calendarIds.push(res[i].calendar_id);
        }

        for (let i = 0; i < calendarIds.length; i++) {
            sql.query('SELECT * FROM calendar where id = ?', [calendarIds[i]], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                calendars.push(res[0]);
                if (i == calendarIds.length - 1) {
                    result(null, calendars);
                }
            })
        }
    });
};

// 달력에 친구 추가하는 기능
Share.createShare = (data, result) => {
    // 해당 닉네임을 가진 유저 검색
    sql.query('SELECT * FROM user WHERE nick_name = ?', [data.nickName], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        // 존재하지 않는 닉네임일 때
        } else if (res.length == 0) {
            result(null, "1");
            return;
        } else {
            // 달력에 해당 닉네임을 가진 유저 검색
            sql.query('SELECT * FROM share WHERE (nick_name = ? AND calendar_id = ?)', [data.nickName, data.calendarId], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                // 이미 참여하고 있는 닉네임일 때
                } else if (res.length != 0) {
                    result(null, "2");
                } else {
                    sql.query('SELECT id FROM user WHERE nick_name = ?', [data.nickName], (err, res) => {
                        if (err) {
                            console.log("error: ", err);
                            result(err, null);
                            return;
                        }
                        sql.query('INSERT INTO share(nick_name, user_id, calendar_id, position) VALUES (?,?,?,?)', [data.nickName, res[0].id, data.calendarId, "guest"], (err, res) => {
                            if (err) {
                                console.log("error: ", err);
                                result(err, null);
                                return;
                            }
                            sql.query('SELECT * FROM share WHERE (nick_name = ? AND calendar_id = ?)', [data.nickName, data.calendarId], (err, res) => {
                                if (err) {
                                    console.log("error: ", err);
                                    result(err, null);
                                    return;
                                }
                                result(null, res);
                            });
                        });
                    });
                }
            });
        }
    });
};

// 달력에 참여하고 있는 친구 가져오는 기능
Share.getFriend = (calendarId, result) => {
    sql.query('SELECT * FROM share where calendar_id = ?', [calendarId], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
}

// 달력에 참여하고 있는 친구 삭제 기능
Share.deleteShare = (data, result) => {
    // 해당 달력에서 삭제를 누른 유저의 포지션 검색
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
            sql.query('DELETE FROM share WHERE (calendar_id = ? AND nick_name = ? )', [data.calendarId, data.nickName], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, "2");
            });
        }
    });
};

module.exports = Share;