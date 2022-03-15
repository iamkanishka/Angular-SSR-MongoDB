const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Router = require('./routes/router.config');
dotenv.config()
connectDB()
var PORT = process.env.PORT || 5200;

const app = express()
app.use(express.json())

Router.routerConfig(app);

app.listen(PORT, () => {
    console.log('server listening on port ' + PORT);
});