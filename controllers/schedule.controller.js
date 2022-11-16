const Schedule = require("../models/schedule.model.js");

exports. createScheduleTable = (req, res) => {
    Schedule.createScheduleTable((err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Schedule."
            });
        else res.send(data);
    });
};

exports.scheduleSerch = (req, res) => {
    Schedule.scheduleSerch((err, data) => {
        
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving schedule."
            });
            else res.send(data);
    });
};

exports.createSchedule = (req, res) => {
    var data = {
        calendar_id: req.body.calendar_id,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
    }
    Schedule.createSchedule(data,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving schedule."
            });
        else 
        {
            res.send(data);
        }
    });
};

exports.checkSchedule = (req, res) => {
    var data = {
        calendar_id: req.body.calendar_id,
    }
    Schedule.checkSchedule(data,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving schedule."
            });
        else 
        {
            res.send(data);
        }
    });
};

exports.deleteSchedule = (req, res) => {
    var data = {
        calendar_id: req.body.calendar_id,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
    }
    Schedule.deleteSchedule(data,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving schedule."
            });
        else 
        {
            res.send(data);
        }
    });
};