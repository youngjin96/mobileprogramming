const Calendar = require("../models/calendar.model.js");

// 캘린더 생성
exports.create = (req, res) => {
    var data = {
        user_id: req.body.user_id,
        name : req.body.name,
        person_num : req.body.person_num,
    }
    Calendar.create(data,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving calendar."
            });
        else res.send(data);
    });
};

// 캘린더 이름 가져오기
exports.getCalendar = (req, res) => {
    Calendar.getCalendar(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.deleteCalendar = (req, res) => {
    Calendar.deleteCalendar(req.params.name, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};