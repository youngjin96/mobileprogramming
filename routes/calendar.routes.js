module.exports = app =>{
    const calendar = require("../controllers/calendar.controller.js");
    //app.delete("/calendar", calendar.deleteCalendar);
    //app.get("/calendar", calendar.getName);
    app.post("/calendar", calendar.create);
    app.get("/calendar/:userId", calendar.getCalendar);
};