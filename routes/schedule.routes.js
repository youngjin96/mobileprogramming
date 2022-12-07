module.exports = app =>{
    const schedule = require("../controllers/schedule.controller.js");

    // 일정 넣기
    app.post("/schedule/:calendar_id", schedule.createSchedule);

    // 일정 가져오기
    app.get("/schedule/date/:calendar_id", schedule.checkSchedule);
    
};