const User = require("../models/user.model.js");

exports.findAll = (req, res) => {
    User.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
exports.putUser = (req, res) => {
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
exports.cheakAll = (req, res) => {
    User.cheakAll((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};