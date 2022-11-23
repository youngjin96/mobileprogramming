module.exports = app =>{
    const share = require("../controllers/share.controller.js");

    //app.post("/share", share.createShare);
    //app.delete("/share", share.deleteShare); //delete
    app.get("/share", share.checkShare);
    //http://localhost:5000/share




    
}
