const Schedule = require("../models/schedule.model.js");

exports.createSchedule = (req, res) => {
    Schedule.createSchedule(req.body ,(err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving schedule."
            });
        else {
            res.send(data);
        }
    });
};

exports.checkSchedule = (req, res) => {
    Schedule.checkSchedule(req.params.calendar_id, (err, data) => {
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
