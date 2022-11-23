module.exports = app =>{
    const user = require("../controllers/user.controller.js");
    
    // GET 회원가입 시 유저 중복체크 URL
    app.get("/user/check/:nick_name", user.checkUser);

    // POST 회원가입 시 유저 생성 URL
    app.post("/user/create", user.createUser);

    // GET 개인정보변경 시 유저 정보 URL
    app.get("/user/information/:id", user.getUser);

    // 전체 조회 
    //app.post("/user", user.putUser);
    //app.put("/user", user.updateUser);
    //app.post("/user", user.searchUserByNick);
    //app.get("/user", user.getAllUser);
    //app.get("/user", user.getBirth);
    //app.get("/user", user.getCalendarId);
    //app.get("/user/:email", user.getAllUser);
};