module.exports = app =>{
    const schedule = require("../controllers/schedule.controller.js");

    app.post("/schedule/:calendar_id", schedule.createSchedule);
    
    app.get("/schedule/date/:calendar_id", schedule.checkSchedule);
    
};