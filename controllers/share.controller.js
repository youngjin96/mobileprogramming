const Share = require("../models/share.model.js");

exports.createShare = (req, res) => {
    var data = {
<<<<<<< HEAD
        id:req.body.id,
        user_id:req.body.user_id,
        nick_name:req.body.nick_name,
    }
    Share.createShare(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.deleteShare = (req, res) => {
    var data = {
        id:req.body.id,
        user_id:req.body.user_id,
    }
    Share.deleteShare(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.getAllShare = (req, res) => {
    Share.getAllShare((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
=======
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
>>>>>>> f10c55d8b52e18b48fc3be4eb93328e03215eeb6
