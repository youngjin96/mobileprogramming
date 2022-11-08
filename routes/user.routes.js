module.exports = app =>{
    const user = require("../controllers/user.controller.js");

    // 전체 조회 
    //app.post("/user", user.putUser);
    //app.post("/user", user.updateUser);
    app.get("/user", user.getAll);
};