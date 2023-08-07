// create server
const express = require("express");
const app = express();

//require package
const bodyParser = require("body-parser");
const port = 6001;
const morgan = require("morgan");
const cors = require("cors");
const db = require("./ultils/database");

//require routes
const userRoutes = require("./routes/user.routes");

//setup routes
app.use("/api/v1/users", userRoutes);

// use package
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
