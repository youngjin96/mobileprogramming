module.exports = app =>{
    const users = require("../controllers/signUp.controller.js");

    app.get("/user", users.findAll)

    
    //app.get("/user", users.putUser); // insert
    //app.get("/user", users.cheakAll); // check
    //app.get("/user/search/", users.serchAll); // serch
};