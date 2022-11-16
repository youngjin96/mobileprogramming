const sql = require("./db.js");

const User = function (user) {
    this.id = user.id;
    this.email = user.email;
    this.nick_name = user.nick_name;
    this.birth = user.birth;
};

User.getAllUser = (result) => { // all serch
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
User.createUser = (data,result) => { // insert user
    
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
//var cheakid = "kalmaho"
User.cheakUser = (data, result) => { // check user
    sql.query('SELECT nick_name FROM user', (err, res) => 
    {
        for(let i=0; i<Object.keys(res).length; i++)
        {
            if(res[i].nick_name == data.nick_name)
            {
                sql.query('SELECT * FROM user where nick_name = ?',[data.nick_name], (err, res) => 
                {
                    console.log(res);
                    result(null,res);
                })
                
                break;
            }
            else if(i==Object.keys(res).length-1)
            {
                result(err, "못찾음");
            }
        }
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        //result(null, res);
    });
};
User.deleteUser = (data,result) => { // delete user
    
    sql.query('delete From user where id = ?',[data.id], (err, res) => 
    {
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