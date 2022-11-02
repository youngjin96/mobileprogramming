module.exports = app =>{
    const calendar = require("../controllers/calendar.controller.js");

    //app.get("/calendar", calendar.createTable);//캘린더 테이블 만들기
    app.get("/calendar", calendar.calendarSerchAll);
    //app.post("/calendar", calendar.createCalendar); // insert
    //app.post("/calendar", calendar.deleteCalendar); // delete calender
};