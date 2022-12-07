const Share = require("../models/share.model.js");

exports.getShare = (req, res) => {
    Share.getShare(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving share."
            });
        else {
            res.send(data);
        }
    });
};

exports.createShare = (req, res) => {
    var data = {
        nickName : req.body.nick_name,
        calendarId : req.body.calendar_id
    }
    Share.createShare(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Share."
            });
        else 
        {
            res.send(data);
        }
    });
};

exports.getFriend = (req, res) => {
    Share.getFriend(req.params.calendarId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving share."
            });
        else {
            res.send(data);
        }
    });
};

exports.deleteShare = (req, res) => {
    var data = {
        calendarId : req.params.calendarId,
        nickName : req.params.nickName,
        userId : req.params.userId
    }
    Share.deleteShare(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving share."
            });
        else {
            res.send(data);
        }
    });
};
