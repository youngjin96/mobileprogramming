module.exports = app =>{
    const calendar = require("../controllers/calendar.controller.js");

    // GET 캘린더 이름 가져오기
    app.get("/calendar/:userId", calendar.getCalendar);

    // POST 캘린더 생성
    app.post("/calendar/create", calendar.create);

    // DELETE 캘린더 삭제
    app.delete("/calendar/delete/:name", calendar.deleteCalendar);
};