const express = require("express");
const PORT = process.env.PORT || 5000;
const helmet = require("helmet");
const routes = require("./routes");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");

server.use(helmet());

server.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Error");
});

server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200
  })
);

server.use("/", routes);

server.listen(PORT, () => console.log(`Listening on ${PORT}`));
