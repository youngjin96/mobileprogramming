const { getBirth } = require("../models/user.model.js");

module.exports = app =>{
    const user = require("../controllers/user.controller.js");

    // 전체 조회 
    //app.post("/user", user.putUser);
    //app.put("/user", user.updateUser);
    //app.post("/user/create", user.createUser);
    //app.post("/user", user.searchUserByNick);
    //app.get("/user", user.searchUser);
    //app.get("/user", user.getAllUser);
    //app.get("/user", user.getBirth);
    app.get("/user", user.getCalendarId);
};