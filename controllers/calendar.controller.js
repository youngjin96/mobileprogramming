const Calendar = require("../models/calendar.model.js");

// 캘린더 생성
exports.create = (req, res) => {
    var data = {
        user_id: req.body.user_id,
        calendar_name : req.body.calendar_name,
    }
    Calendar.create(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving calendar."
            });
        else res.send(data);
    });
};

// 전체 캘린더 가져오기
exports.getCalendars = (req, res) => {
    Calendar.getCalendars(req.params.userId, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};

exports.deleteCalendar = (req, res) => {
    var data = {
        calendarId : req.params.calendarId,
        calendarName : req.params.calendarName,
        userId : req.params.userId
    }
    Calendar.deleteCalendar(data, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};