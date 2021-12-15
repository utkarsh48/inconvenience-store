const express = require('express');
const config = require("config");

const app = express();


require("./startup/config")(app);
require("./startup/database")();
require("./startup/routes")(app);


app.listen(process.env.PORT || 3000, ()=>console.log("listening..."));