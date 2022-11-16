const sql = require("./db.js");
const microTime = require("microtime")

var id = microTime.now()

const Friend = function (friend) {
    this.id = friend.id;
    this.user_id = friend.user_id;
    this.friend_id = friend.friend_id;
    this.nick_name = friend.nick_name;
};

Friend.createFriend = (data, result) => {
    sql.query('SELECT id from user WHERE nick_name = ?', [data.nick_name], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(res.length == 0) {
            result(null, "존재하지 않는 유저입니다.");
        }
        else {
            sql.query('INSERT INTO friend (id, user_id, friend_id, nick_name) VALUES (?, ?, ?, ?)', [id, data.user_id, res[0].id, data.nick_name], (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(err, null);
                    return;
                }
                result(null, res);
            });
        }
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

Friend.viewFriend = (data, result) => {
    sql.query('SELECT user_id, nick_name from friend', (err, res) => {
        var found_list = [];
        for(let i=0; i<Object.keys(res).length; i++){
            if(res[i].user_id == data.user_id)
            found_list.push(res[i].nick_name);
        }
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(found_list.length == 0)
            result(null, "친구 없음");
        else
            result(null, found_list);
    });
};

Friend.getAllFriend = result => {
    sql.query('SELECT * from friend', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};

module.exports = Friend;