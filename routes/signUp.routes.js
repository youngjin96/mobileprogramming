module.exports = app =>{
    const users = require("../controllers/signUp.controller.js");

    // 전체 조회 
    app.get("/users", users.findAll);
};