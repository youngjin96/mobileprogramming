module.exports = app =>{
    const user = require("../controllers/user.controller.js");
    
    // GET 회원가입 시 유저 중복체크 URL
    app.get("/user/check/:nick_name", user.checkUser);

    // POST 회원가입 시 유저 생성 URL
    app.post("/user/create", user.createUser);

    // GET 개인정보변경 시 유저 정보 URL
    app.get("/user/information/:id", user.getUser);

    // GET 유저 검색
    app.get("/user/search/:nick_name", user.searchUser);

    // PUT 개인정보변경
    app.put("/user/update", user.update);
};