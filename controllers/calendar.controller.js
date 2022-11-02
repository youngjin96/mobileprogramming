
const Calendar = require("../models/calendar.model.js");

exports. createTable = (req, res) => {
    Calendar.createtable((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
exports.calendarSerchAll = (req, res) => {
    Calendar.calendarserch((err, data) => {
        
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
exports.putCalendar = (req, res) => {
    Calendar.putcalendar((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving users."
            });
        else res.send(data);
    });
};
