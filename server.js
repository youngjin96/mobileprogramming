const express = require('express');
const http = require('http');
const bodyParser= require('body-parser');
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

require("./routes/user.routes.js")(app);
require("./routes/calendar.routes.js")(app);
require("./routes/schedule.routes.js")(app);
require("./routes/share.routes.js")(app);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});