module.exports = app =>{
    const friend = require("../controllers/friend.controller.js");
    // 친구 추가
    app.post("/friend/create", friend.createFriend);
    
    // 친구 삭제
    app.delete("/friend", friend.deleteFriend);

    // 친구 목록 가져오기
    app.get("/friend/get/:userId", friend.viewFriend);
};