const User = require("../models/user.model.js");

exports.getAllUser = (req, res) => { // 모든유저
    User.getAllUser((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
exports.createUser = (req, res) => { //유저추가
    var data = {
        id : req.body.id,
        email: req.body.email,
        nick_name : req.body.nick_name,
        birth : req.body.birth,
    }
    
    User.putUser(data,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
exports.cheakUser = (req, res) => { //유저검색
    var data = {
        nick_name : req.body.nick_name,
    }
    User.cheakUser(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
exports.deleteUser = (req, res) => {//유저삭제
    var data = {
        id : req.body.id,
        nick_name : req.body.nick_name,
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