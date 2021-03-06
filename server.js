const express = require("express");
const app = express();
const db = require("./src/models");
const initRoutes = require("./src/routes/web");
const bodyParser = require("body-parser")
const downloadRouter = require("./src/routes/download")
const cors = require('cors')

global.__basedir = __dirname;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
initRoutes(app);
app.use(downloadRouter)

// db.sequelize.sync();
db.sequelize.sync({ force: false }).then(() => {
  console.log("Drop and re-sync db.");
});

let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
