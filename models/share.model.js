const sql = require("./db.js");

const Share = function (share) {
    this.id = share.id
    this.calendar_id = share.calendar_id;
    this.friend_id = share.friend_id;
};
const microTime = require('microtime');
var id = microTime.now();

Share.createShare = (data,result) => {
    sql.query('INSERT INTO share(id, calendar_id, friend_id) VALUES (?,?,?)',[id, data.calendar_id, data.friend_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
Share.deleteShare = (data,result) => { // delete schedule
    
    sql.query('delete From share where (calendar_id = ? and friend_id = ? )',[data.calendar_id, data.friend_id], (err, res) => 
    {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
Share.checkShare = (data,result) => {
    sql.query('SELECT friend_id FROM share where calendar_id = ?',[data.calendar_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        sql.query('SELECT nick_name FROM user where id = ?',[res[0].friend_id],(err,res)=>{
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            result(null, res);
        })
    });
};
module.exports = Share;