const User = require("../models/user.model.js");

// 회원가입 시 유저 생성
exports.createUser = (req, res) => {
    var data = {
        id : req.body.id,
        email: req.body.email,
        nick_name : req.body.nick_name,
        birth : req.body.birth,
    };
    User.create(data, (err, data) => {
        if (err) {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        } else {
            res.send(data);
        }
    });
};

// 회원가입 시 유저 중복 체크
exports.checkUser = (req, res) => {
    User.check(req.params.nick_name, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

// 개인정보변경 시 유저 정보 가져오기
exports.getUser = (req, res) => {
    User.info(req.params.id, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else {
            res.send(data);
        }
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