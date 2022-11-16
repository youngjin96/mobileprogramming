const sql = require("./db.js");

const User = function (user) {
    this.id = user.id;
    this.email = user.email;
    this.nick_name = user.nick_name;
    this.birth = user.birth;
};

User.getInformation = (id, result) => {
    sql.query('SELECT * FROM user WHERE id = ?', [id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    })
}

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
<<<<<<< HEAD
<<<<<<< HEAD

User.getAllUser = result => {
    sql.query('SELECT * from user', (err, res) => {
=======
//var cheakid = "kalmaho"
User.cheakUser = (data, result) => { // check user
=======

User.checkUser = (data, result) => { // check user
>>>>>>> f10c55d8b52e18b48fc3be4eb93328e03215eeb6
    sql.query('SELECT nick_name FROM user', (err, res) => 
    {
        for(let i=0; i<Object.keys(res).length; i++)
        {
            if(res[i].nick_name == data.nick_name)
            {
                sql.query('SELECT * FROM user where nick_name = ?',[data.nick_name], (err, res) => 
                {
                    result(null, true);
                })
                break;
            }
            else if(i==Object.keys(res).length-1)
            {

                result(err, false);
            }
        }
        if (err) {
            result(err, null);
            return;
        }
        //result(null, res);
    });
};
User.deleteUser = (data,result) => { // delete user
    
    sql.query('delete From user where id = ?',[data.id], (err, res) => 
    {
>>>>>>> 2fe1572edd88975468556c5b5bde008ec96047a8
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