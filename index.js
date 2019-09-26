require("dotenv").config(); 

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

// Init middleware
// app.use(logger);

// Body Parser Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Set static folder
app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html"]
  })
);

// app.use("/api/members", require("./routes/api/members"));
app.use("/api/beats", require("./routes/api/beats"));

app.use("/api/purchase", require("./routes/api/purchase"));

app.use("/api/remove-beat-entry", require("./routes/api/deleteBeat"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
