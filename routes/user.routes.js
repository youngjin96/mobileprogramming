module.exports = app =>{
    const user = require("../controllers/user.controller.js");

    //app.get("/user", users.getAllUser); // serch
    //app.post("/user", users.createUser); // insert
    app.post("/user/check", user.checkUser); // check(닉네임기준)

    //app.delete("/user", users.deleteUser); // delete(id기준)
    //app.get("/user/information", user.getInformation);


    //app.get("/user/search/", users.serchAll); // serch
    //http://localhost:5000/user
};