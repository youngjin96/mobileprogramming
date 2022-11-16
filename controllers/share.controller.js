const Share = require("../models/share.model.js");

exports.createShare = (req, res) => {
    var data = {
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
