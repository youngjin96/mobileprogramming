const Calendar = require("../models/calendar.model.js");

exports.createCalendar = (req, res) => {
    var data = {
        id:req.body.id,
        user_id:req.body.user_id,
        name:req.body.name,
        person_num:req.body.person_num,
    }
    Calendar.createCalendar(data, (err, data) => {
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
        id:req.body.id,
        user_id:req.body.user_id,
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
