const sql = require("./db.js");
<<<<<<< HEAD
const microTime = require("microtime")

var id = microTime.now()

const Share = function (share) {
    this.id = share.id;
    this.calendar_id = share.calendar_id;
    this.friend_id = share.friend_id;
};

Share.createShare = (data, result) => {
    sql.query('INSERT INTO share (id, calendar_id, friend_id) VALUES (?, ?, ?)', [id, data.calendar_id_id, data.friend_id], (err, res) => {
=======

const Share = function (share) {
    this.id = share.id
    this.calendar_id = share.calendar_id;
    this.friend_id = share.friend_id;
};
const microTime = require('microtime');
var id = microTime.now();

Share.createShare = (data,result) => {
    sql.query('INSERT INTO share(id, calendar_id, friend_id) VALUES (?,?,?)',[id, data.calendar_id, data.friend_id], (err, res) => {
>>>>>>> f10c55d8b52e18b48fc3be4eb93328e03215eeb6
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
<<<<<<< HEAD

Share.deleteShare = (data, result) => {
    sql.query('delete from share WHERE (id=? AND user_id=?)', [data.id, data.user_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });                
};

Share.getAllShare = result => {
    sql.query('SELECT * from share', (err, res) => {
=======
Share.deleteShare = (data,result) => { // delete schedule
    
    sql.query('delete From share where (calendar_id = ? and friend_id = ? )',[data.calendar_id, data.friend_id], (err, res) => 
    {
>>>>>>> f10c55d8b52e18b48fc3be4eb93328e03215eeb6
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};
<<<<<<< HEAD

=======
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
>>>>>>> f10c55d8b52e18b48fc3be4eb93328e03215eeb6
module.exports = Share;