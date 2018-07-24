const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const data = require("./photosinfo.js");
let students = data.photosInfo;

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/images/"));
app.use(methodOverride("_method"));
let upload = multer({
  dest: "public/images/",
  limits: {
    fileSize: 5000000,
    files: 1
  },
  filename: function(req, file, cb) {
    var filename = Date.now();
    switch (file.mimetype) {
      case "image/png":
        filename = filename + ".png";
        break;
      case "image/jpeg":
        filename = filename + ".jpeg";
        break;
      default:
        break;
    }
  }
});
app.get("/", (req, res) => {
  res.render("index", {
    students: students
  });
  console.log(students);
});
app.get("/students/:firstName", (req, res) => {
  let flag = false;
  const firstName = req.params.firstName;
  for (let i = 0; i < students.length; i++) {
    if (students[i].firstName === firstName) {
      res.render("singlestudent", { student: students[i] });

      flag = true;

      break;
    }
  }

  if (!flag) {
    res.send(`Student n. ${firstName} was not found.`);
  }
});

app.get("/addstudent", (req, res) => {
  const pageUrl = req.url;
  res.render("addstudent");
});

app.post("/newstudent", upload.single("photo"), (req, res) => {
  const pageUrl = req.url;
  res.render("newstudent", {
    src: req.file.filename,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    title: req.body.title,
    nationality: req.body.nationality,
    skills: [req.body.skills],
    whySofterDeveloper: req.body.whySofterDeveloper,
    longTermVision: req.body.longTermVision,
    motivatesMe: req.body.motivatesMe,
    favoriteQuote: req.body.favoriteQuote,
    joinedOn: req.body.joinedOn
  });
  students.push({
    src: req.file.filename,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    title: req.body.title,
    nationality: req.body.nationality,
    skills: [req.body.skills],
    whySofterDeveloper: req.body.whySofterDeveloper,
    longTermVision: req.body.longTermVision,
    motivatesMe: req.body.motivatesMe,
    favoriteQuote: req.body.favoriteQuote,
    joinedOn: req.body.joinedOn
  });
  // console.log(req.file);
  res.end();
});

app.delete("/students/:firstName", (req, res) => {
  let flag = false;

  const firstName = req.params.firstName;

  for (let i = 0; i < students.length; i++) {
    if (students[i].firstName === firstName) {
      students.splice(i, 1);
      // console.log(students);
      flag = true;
      res.redirect("/");
      break;
    }
  }

  if (!flag) {
    // res.send(`Student n. ${firstName} was removed.`);
  }
});

app.listen(8080, () => {
  console.log("Server is running on port 8080....");
});
