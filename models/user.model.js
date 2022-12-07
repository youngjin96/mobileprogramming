const sql = require("./db.js");

const User = function (user) {
    this.id = user.id;
    this.email = user.email;
    this.nick_name = user.nick_name;
    this.birth = user.birth;
};

// 회원가입 시 유저 생성
User.create = (data, result) => {
    sql.query('INSERT INTO user(id, email, nick_name, birth) VALUES (?,?,?,?)',[data.id, data.email, data.nick_name, data.birth], (err, res) => 
    {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

// 회원가입 시 유저 중복 체크
User.check = (nickName, result) => {
    sql.query('SELECT nick_name FROM user', (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        for(let i = 0; i < Object.keys(res).length; i++) {
            if(res[i].nick_name == nickName) {
                result(null, true);
                break;
            } else if(i == Object.keys(res).length - 1) {
                result(err, false);
            }
        }
    });
};

// 개인정보변경 시 유저 정보 가져오기
User.info = (id, result) => {
    sql.query('SELECT * FROM user WHERE id = ?', [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

User.searchUser = (nickName, result) => {
    sql.query('SELECT * FROM user WHERE nick_name = ?', [nickName], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log(res);
        result(null, res);
    });                
};

User.update = (data, result) => {
    sql.query('UPDATE user SET email = ?, nick_name = ?, birth = ? WHERE id = ?', [data.email, data.nick_name, data.birth, data.id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
module.exports = User;