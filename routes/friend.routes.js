module.exports = app =>{
    const friend = require("../controllers/friend.controller.js");
    app.post("/friend", friend.createFriend);
    //app.delete("/friend", friend.deleteFriend);
    //app.get("/friend", friend.getAll);
    //app.get("/friend", friend.viewFriend);
};