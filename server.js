const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
//use dotenv to configure keys and api_secret id
const dotenv = require("dotenv");
//configure dotenv
dotenv.config();
//use body parser
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

//connect to mongoose
mongoose
  .connect(process.env.URL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("connected"))
  .catch(err => console.log("Caught", err.stack));
const db = mongoose.connection;
db.on("error", error => console.log(error));
db.once("open", () => console.log("connected to database"));

//setting up Server to accept JSON
app.use(express.json());
const port = 8080 || process.env.PORT;

//import routes and use
const subScribersRoute = require("./routes/subscribers");
app.use("/subcribers", subScribersRoute);

app.get("/", (req, res, next) => {
  res.send("Welcome Home");
});

app.listen(port, () => {
  console.log(`Server is up and running at ${port}`);
});
