const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbCoonect = require('../db/dbConnect');
const cookieParser = require("cookie-parser");
const routes = require("../routers/routers");
const { listen } = require("../controllers/blockchainControllers")
const HTTP_PORT = process.env.HTTP_PORT || 3001;
const app = express();

dbCoonect()
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/", routes)

listen()
//mongoose.connection.once('open', () => {
  app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
//})
