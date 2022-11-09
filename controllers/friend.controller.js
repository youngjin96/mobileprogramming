const Friend = require("../models/friend.model.js");

exports.createFriend = (req, res) => {
    var data = {
        id:req.body.id,
        user_id:req.body.user_id,
        nick_name:req.body.nick_name,
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

exports.searchFriend = (req, res) => {
    Friend.searchFriend((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.getAll = (req, res) => {
    Friend.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
