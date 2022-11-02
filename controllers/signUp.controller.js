const User = require("../models/signUp.model.js");

exports.putUser = (req, res) => {
    const {
        body = { User }
    } = req;
    User.putuser((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
exports.searchNick = (req, res) => {
    User.searchnick((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};