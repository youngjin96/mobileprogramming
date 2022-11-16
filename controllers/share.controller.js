const Share = require("../models/share.model.js");

exports.createShare = (req, res) => {
    var data = {
        calendar_id: req.body.calendar_id,
        friend_id : req.body.friend_id,
    }
    Share.createShare(data,(err, data) => {
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
exports.deleteShare = (req, res) => {
    var data = {
        calendar_id: req.body.calendar_id,
        friend_id: req.body.friend_id,
    }
    Share.deleteShare(data,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving share."
            });
        else 
        {
            res.send(data);
        }
    });
};
exports.checkShare = (req, res) => {
    var data = {
        calendar_id: req.body.calendar_id,
    }
    Share.checkShare(data,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving share."
            });
        else 
        {
            res.send(data);
        }
    });
};