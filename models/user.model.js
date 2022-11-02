const sql = require("./db.js");

const User = function (user) {
    this.id = user.id;
    this.email = user.email;
    this.nickName = user.nick_name;
    this.birth = user.birth;
};

User.putuser = (data, result) => {
    sql.query('INSERT INTO user(id, email, nick_name, birth) VALUES (?, ?, ?, ?)', [data.id, data.email, data.nick_name, data.birth], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

User.search = result => {
    sql.query('SELECT DISTINCT nick_name from user', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};

var nick="juan";
User.searchnick = result => {
    sql.query('SELECT nick_name from user', (err, res) => {
        var nick_list = [];
        for(let i=0; i<Object.keys(res).length; i++){
            if(res[i].nick_name == nick)
            nick_list.push(nick)
        }
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        if(nick_list.length == 0)
            result(null, "유저 없음");
        else
            result(null, nick_list[0]);

    });
};

module.exports = User;