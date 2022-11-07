const sql = require("./db.js");
//const users = require("../controllers/signUp.controller.js");

const User = function (user) {
    this.id = user.id;
    this.email = user.email;
    this.nickName = user.nick_name;
    this.birth = user.birth;
};

User.getAll = (result) => { // all serc
    sql.query('SELECT * FROM user', (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
//,["345523454", "retry@naver.com", "hyun", "2001-04-13"]
User.putUser = (data,result) => { // insert user
    
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
var cheakid = "hyun"
User.cheakAll = result => { // insert user
    sql.query('SELECT nick_name FROM user', (err, res) => 
    {
        for(let i=0; i<Object.keys(res).length; i++)
        {
            console.log(res[i].nick_name);
            if(res[i].nick_name == cheakid)
            {
                console.log("중복");
                break;
            }
        }
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = User;