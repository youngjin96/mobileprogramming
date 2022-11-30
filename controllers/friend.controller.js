const Friend = require("../models/friend.model.js");

exports.createFriend = (req, res) => {
    var data = {
        user_id : req.body.user_id,
        nick_name : req.body.nick_name
    }
    Friend.createFriend(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.deleteFriend = (req, res) => {
    var data = {
        id:req.body.id,
        user_id:req.body.user_id,
    }
    Friend.deleteFriend(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.viewFriend = (req, res) => {
    var data = {
        user_id:req.body.user_id,
    }
    Friend.viewFriend(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.getAllFriend = (req, res) => {
    Friend.getAllFriend((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
