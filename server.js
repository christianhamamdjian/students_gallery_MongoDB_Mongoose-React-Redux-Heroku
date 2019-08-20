const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.PORT || 8080;

const students = require("./routes/api/students");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");

if (process.env.NODE_ENV !== "production") require("dotenv").config();
const db = process.env.MONGODB;
// Bodyparser Middleware
app.use(express.json());

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Student Model
const Student = require("./models/Student");

// Server static Routes
app.use(express.static(__dirname + "/client/build"));
app.use(express.static(__dirname + "/client/build/css"));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/images/"));

// Use Routes
app.use("/", students);
app.use("/api/students", students);
app.use("/api/students/:id", students);
app.use("/api/newstudent", students);
app.use("/api/update/:id", students);
app.use("/api/:id", students);
app.use("/api/users", users);
app.use("/api/auth", auth);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log("Server is running on port" + port);
});
