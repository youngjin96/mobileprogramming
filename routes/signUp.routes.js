module.exports = app =>{
    const users = require("../controllers/signUp.controller.js");

    // 전체 조회 
    app.post("/users", users.putUser);
};