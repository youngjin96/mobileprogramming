const User = require("../models/user.model.js");

exports.putUser = (req, res) => {
    var data = {
        id:req.body.id,
        email:req.body.email,
        nick_name:req.body.nick_name,
        birth:req.body.birth,
    }
    User.putUser(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.updateUser = (req, res) => {
    var data = {
        id:req.body.id,
        email:req.body.email,
        nick_name:req.body.nick_name,
        birth:req.body.birth,
    }
    User.updateUser(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.searchUser = (req, res) => {
    User.searchUser((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.searchUserByNick = (req, res) => {
    var data = {
        nick_name:req.body.nick_name,
    }
    User.searchUserByNick(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.getAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};