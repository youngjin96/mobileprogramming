module.exports = app =>{
    const share = require("../controllers/share.controller.js");

    /** AddCalendar 
     *  공유하고 있는 캘린더 모두 가져오는 API
    */
    app.get("/share/get/:userId", share.getShare);

    /** CalendarMain
     *  해당 캘린더에 친구 추가 API
     */
    app.post("/share/add", share.createShare);

    /** CalendarMain
     *  해당 캘린더에 참여하고 있는 친구 목록 가져오는 API
     */
    app.get("/share/get/friend/:calendarId", share.getFriend);
    
    /** CalendarMain
     *  해당 캘린더에 참여하고 있는 친구 삭제 API
     */
    app.delete("/share/delete/:calendarId/:nickName/:userId", share.deleteShare);
}
