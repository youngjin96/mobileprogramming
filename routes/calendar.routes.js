module.exports = app =>{
    const calendars = require("../controllers/calendar.controller.js");

    app.get("/calendars", calendars.calendarSearch);
};