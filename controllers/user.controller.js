const User = require("../models/user.model.js");

exports.createUser = (req, res) => {
    var data = {
        id:req.body.id,
        email:req.body.email,
        nick_name:req.body.nick_name,
        birth:req.body.birth,
    }
    User.createUser(data, (err, data) => {
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

exports.getCalendarId = (req, res) => {
    var data = {
        id:req.body.id,
    }
    User.getCalendarId(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.getBirth = (req, res) => {
    var data = {
        id:req.body.id,
    }
    User.getBirth(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.getAllUser = (req, res) => {
    User.getAllUser((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};