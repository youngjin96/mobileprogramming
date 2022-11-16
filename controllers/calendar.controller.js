const Calendar = require("../models/calendar.model.js");

exports. createCalendarTable = (req, res) => {
    Calendar.createCalendarTable((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving calendar."
            });
        else res.send(data);
    });
};
exports.calendarSerchAll = (req, res) => {
    Calendar.calendarserch((err, data) => {
        
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving calendar."
            });
            else res.send(data);
    });
};
exports.createCalendar = (req, res) => {
    var data = {
        user_id: req.body.user_id,
        name : req.body.name,
        person_num : req.body.person_num,
    }
    Calendar.createCalendar(data,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving calendar."
            });
        else res.send(data);
    });
};

exports.calendarSearch = (req, res) => {
    Calendar.calendarsearch((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
