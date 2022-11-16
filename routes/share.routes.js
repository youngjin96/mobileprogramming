module.exports = app =>{
    const share = require("../controllers/share.controller.js");
<<<<<<< HEAD
    //app.post("/share", share.createShare);
    //app.delete("/share", share.deleteShare);
    //app.get("/share", share.getAll);
};
=======

    //app.post("/share", share.createShare);
    //app.delete("/share", share.deleteShare); //delete
    app.get("/share", share.checkShare);
    //http://localhost:5000/share




    
}
>>>>>>> f10c55d8b52e18b48fc3be4eb93328e03215eeb6
