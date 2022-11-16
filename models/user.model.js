const sql = require("./db.js");

const User = function (user) {
    this.id = user.id;
    this.email = user.email;
    this.nick_name = user.nick_name;
    this.birth = user.birth;
};

User.createUser = (data, result) => {
    sql.query('INSERT INTO user(id, email, nick_name, birth) VALUES (?, ?, ?, ?)', [data.id, data.email, data.nick_name, data.birth], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

User.updateUser = (data, result) => {
    sql.query('UPDATE user SET email = ?, nick_name = ?, birth = ? WHERE id = ?', [data.email, data.nick_name, data.birth, data.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

User.getAllUser = result => {
    sql.query('SELECT * from user', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};

User.searchUser = result => {
    sql.query('SELECT DISTINCT nick_name from user', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};

User.getBirth = (data, result) => {
    sql.query('SELECT birth from user WHERE id = ?', [data.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};

User.getCalendarId = (data, result) => {
    sql.query('SELECT calendar_id from share WHERE friend_id = ?', [data.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};


User.searchUserByNick = (data, result) => {
    sql.query('SELECT * from user', (err, res) => {
        var found_list = [];
        for(let i=0; i<Object.keys(res).length; i++){
            if(res[i].nick_name == data.nick_name)
            found_list.push(res[i])
        }
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(found_list.length == 0)
            result(null, "유저 없음");
        else
            result(null, found_list);
    });
};

module.exports = User;