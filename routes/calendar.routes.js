module.exports = app =>{
    const calendar = require("../controllers/calendar.controller.js");
    //app.post("/calendar", calendar.deleteCalendar);
    app.get("/calendar", calendar.getName);
};