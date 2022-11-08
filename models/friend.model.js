const sql = require("./db.js");
const microTime = require("microtime")

var id = microTime.now()

const Friend = function (friend) {
    this.id = friend.id;
    this.user_id = friend.user_id;
    this.nick_name = friend.nick_name;
};


Friend.createFriend = (data, result) => {
    var id = microTime.now()
    sql.query('INSERT INTO friend (id, user_id, nick_name) VALUES (?, ?, ?)', [id, data.user_id, data.nick_name], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

Friend.deleteFriend = (data, result) => {
    sql.query('delete from friend WHERE (id=? AND user_id=?)', [data.id, data.user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};

Friend.searchFriend = result => {
    sql.query('SELECT DISTINCT nick_name from friend', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};

Friend.getAll = result => {
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