const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const ejs = require("ejs");
const path = require("path");
const { MongoClient, ObjectID } = require("mongodb");
const methodOverride = require("method-override");
const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb://chris:chris18@ds159121.mlab.com:59121/students_gallery",
  { useNewUrlParser: true }
);

const Student = mongoose.model("Student", {
  photo: { data: Buffer, contentType: String },
  src: {
    type: String
  },
  alt: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  title: {
    type: String
  },
  nationality: {
    type: String
  },
  skills: {
    type: String
  },
  whySofterDeveloper: {
    type: String
  },
  longTermVision: {
    type: String
  },
  motivatesMe: {
    type: String
  },
  favoriteQuote: {
    type: String
  },
  joinedOn: {
    type: String
  }
});

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/images/"));
app.use(methodOverride("_method"));

const upload = multer({
  dest: "public/images/",
  limits: {
    fileSize: 5000000,
    files: 1
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

app.get("/", (req, res) => {
  Student.find().then(
    doc => {
      if (!doc) {
        return res.status(404).send("Not found");
      }
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/api/students", (req, res) => {
  Student.find().then(
    doc => {
      if (!doc) {
        return res.status(404).send("Not found");
      }
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  Student.findById(_id).then(
    doc => {
      if (!doc) {
        return res.status(404).send("Not Found");
      }
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.post("/api/newstudent", upload.single("photo"), (req, res) => {
  console.log("Server photo:", req.file);
  const newStudent = new Student({
    photo: req.file,
    src: "/" + req.file.filename,
    alt: req.file.filename,
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
  console.log("My photo:", req.file);
  newStudent.save().then(
    doc => {
      console.log("Saved");
      console.log(JSON.stringify(doc, undefined, 4));
      res.send(doc);
    },
    e => {
      console.log("Unable to save", e);
    }
  );
  res.json(newStudent);
});

app.put("/api/update/:id", upload.single("photo"), (req, res) => {
  console.log(req.body.alt);
  const id = req.params.id;
  let fileName = req.body.alt;
  if (req.file) {
    fileName = req.file.filename;
  }
  Student.findByIdAndUpdate(
    id,
    {
      photo: req.file,
      src: "/" + fileName,
      alt: fileName,
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
    },
    { new: true }
  ).then(
    doc => {
      console.log("Saved");
      console.log(JSON.stringify(doc, undefined, 4));
      res.json(doc);
    },
    e => {
      console.log("Unable to save", e);
    }
  );
});

app.delete("/api/:id", (req, res) => {
  const id = req.params.id;

  Student.findByIdAndRemove(id).then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

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
