const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.send("<h1>Welcome to Trimurti Mitra Mandal<h1>");
});

require('./routes.js')(app);

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});