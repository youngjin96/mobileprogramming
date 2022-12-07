const sql = require("./db.js");

const Friend = function (friend) {
    this.id = friend.id;
    this.user_id = friend.user_id;
    this.friend_id = friend.friend_id;
    this.nick_name = friend.nick_name;
};

Friend.createFriend = (data, result) => {
    var my_nickname = "";
    var friend_id = "";

    var tableName = "friend_" + data.user_id;
    var tableName_f;

    let query = `CREATE TABLE IF NOT EXISTS ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, nick_name VARCHAR(255))`;

    //친구 id 가져오기
    sql.query("SELECT id FROM user where nick_name = ?", [data.nick_name], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        friend_id = res[0].id;
        tableName_f = "friend_" + friend_id;

        let query_f = `CREATE TABLE IF NOT EXISTS ${tableName_f} (
            id INT AUTO_INCREMENT PRIMARY KEY, nick_name VARCHAR(255))`;

        // 친구 friend 테이블생성  
        sql.query(query_f, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            //insert
            sql.query(`SELECT nick_name FROM ${tableName_f}`, (err, res) => {
                if (err) {
                    result(err, null);
                    return;
                }
                sql.query(`INSERT INTO ${tableName_f} (nick_name) VALUES (?)`, [my_nickname], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                })
            });
        });
    });

    //내 닉네임 가져오기  
    sql.query("SELECT nick_name FROM user where id = ?", [data.user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        my_nickname = res[0].nick_name;

        //내 친구 테이블 생성  
        sql.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }

            sql.query(`SELECT nick_name FROM ${tableName}`, (err, res) => { //insert
                if (err) {
                    result(err, null);
                    return;
                }
                sql.query(`INSERT INTO ${tableName} (nick_name) VALUES (?)`, [data.nick_name], (err, res) => {
                    if (err) {
                        console.log("error: ", err);
                        result(err, null);
                        return;
                    }
                    result(null, res);
                });
            });
        });
    });
};

Friend.deleteFriend = (data, result) => {
    sql.query('delete from friend WHERE (nick_name=? AND user_id=?)', [nick_name.id, data.user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Friend.viewFriend = (userId, result) => {
    var tableName = "friend_" + userId;
    var query = `SELECT * FROM ${tableName}`
    sql.query(query, (err, res) => {
        var found_list = [];
        for (let i = 0; i < Object.keys(res).length; i++) {
            found_list.push(res[i]);
        }
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if (found_list.length == 0)
            result(null, "친구 없음");
        else
            result(null, found_list);
    });
};

module.exports = Friend;