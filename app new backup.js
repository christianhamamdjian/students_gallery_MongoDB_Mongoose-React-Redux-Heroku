const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const ejs = require("ejs");
const path = require("path");
const { MongoClient, ObjectID } = require("mongodb");
const methodOverride = require("method-override");
const app = express();
// const myData = require("./photosinfo.js");
// let students = myData.photosInfo;
// const port = process.env.PORT || 8080;
const port = 8080;

// app.use((req, res, next) => {
//   console.log(res.body);
//   // req.method and if req.url is equall to the post url
//   MongoClient.connect(
//     "mongodb://localhost:27017/StudentInfo",
//     (err, client) => {
//       if (err) {
//         console.log("Unable to connect to MongoDB server");
//       }
//       console.log("Connnected to mongodb server");
//       const db = client.db("StudentInfo");
//       db.collection("Students").insertOne(req.body, (err, data) => {
//         if (err) {
//           console.log("Unable to add data");
//         }
//       });
//       client.close();
//     }
//   );

//   next();
// });

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
  MongoClient.connect(
    "mongodb://localhost:27017/StudentInfo",
    (err, client) => {
      const db = client.db("StudentInfo");

      db.collection("Students")
        .find()
        .toArray()
        .then(
          student => {
            res.render("index", { students: student });
          },
          err => {}
        );

      client.close();
    }
  );
});
app.get("/students/:id", (req, res) => {
  MongoClient.connect(
    "mongodb://localhost:27017/StudentInfo",
    (err, client) => {
      const db = client.db("StudentInfo");

      let flag = false;
      const StudentId = req.params.id;

      db.collection("Students")
        .find()
        .toArray()
        .then(
          student => {
            for (let i = 0; i < student.length; i++) {
              if (student[i]._id === StudentId) {
                res.render("singlestudent", {
                  student: student[i]._id
                });
                console.log({ student: student[i]._id });
                flag = true;

                break;
              }
            }

            if (!flag) {
              // res.send(`Student n. ${firstName} was not found.`);
            }
          },
          err => {}
        );

      client.close();
    }
  );
});

app.get("/addstudent", (req, res) => {
  const pageUrl = req.url;
  res.render("addstudent");
});

app.post("/newstudent", upload.single("photo"), (req, res) => {
  const pageUrl = req.url;
  const newStudent = {
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
  };
  MongoClient.connect(
    "mongodb://localhost:27017/StudentInfo",
    (err, client) => {
      if (err) {
        console.log("Unable to connect to MongoDB server");
      }
      console.log("Connnected to mongodb server");
      const db = client.db("StudentInfo");
      db.collection("Students").insertOne(newStudent, (err, data) => {
        if (err) {
          console.log("Unable to add data");
        }
      });
      client.close();
    }
  );
  res.render("newstudent", newStudent);
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

app.listen(port, () => {
  console.log("Server is running on port" + port);
});
