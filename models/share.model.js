const sql = require("./db.js");
const microTime = require("microtime")

var id = microTime.now()

const Share = function (share) {
    this.id = share.id;
    this.calendar_id = share.calendar_id;
    this.friend_id = share.friend_id;
};

Share.createShare = (data, result) => {
    sql.query('INSERT INTO share (id, calendar_id, friend_id) VALUES (?, ?, ?)', [id, data.calendar_id_id, data.friend_id], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

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
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};

module.exports = Share;