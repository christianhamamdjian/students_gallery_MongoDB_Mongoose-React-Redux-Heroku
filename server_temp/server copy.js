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

// app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

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

// app.set("views", path.join(__dirname, "views"));

// app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/public/css"));
app.use(express.static(__dirname + "/public/images/"));
app.use(methodOverride("_method"));

// var storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, "./uploads"); //Destination folder
//   },
//   filename: function(req, file, cb) {
//     cb(null, file.originalname); //File name after saving
//   }
// });

// var upload = multer({ storage: storage });

const upload = multer({
  dest: "public/images/",
  limits: {
    fileSize: 5000000,
    files: 1
  },
  filename: function(req, file, cb) {
    // cb(null, file.originalname);
    let filename = Date.now();
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
  Student.find().then(
    doc => {
      if (!doc) {
        return res.status(404).send("Not found");
      }
      // console.log(doc);
      // res.render("index", { students: doc });
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
      // console.log(doc);
      // res.render("index", { students: doc });
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get("/students/:id", (req, res) => {
  // find
  // findById
  // findOne
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
  // photo.data = fs.readFileSync(imgPath);
  console.log("My photo:", photo);
  const newStudent = new Student({
    photo: req.body.photo,
    src: req.body.src,
    alt: req.body.alt,
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
  res.render("newstudent", newStudent);
  res.end();
});

app.post("/api/update/:id", (req, res) => {
  const id = req.params.id;
  console.log("Body:", req.body);
  Student.findByIdAndUpdate(id, {
    _id: id,
    src: req.body.newSrc,
    alt: req.body.newAlt,
    firstName: req.body.newFirstName,
    lastName: req.body.newLastName,
    title: req.body.newTitle,
    nationality: req.body.newNationality,
    skills: [req.body.newSkills],
    whySofterDeveloper: req.body.newWhySofterDeveloper,
    longTermVision: req.body.newLongTermVision,
    motivatesMe: req.body.newMotivatesMe,
    favoriteQuote: req.body.newFavoriteQuote,
    joinedOn: req.body.newJoinedOn
  }).then(
    doc => {
      console.log("Saved");
      console.log(JSON.stringify(doc, undefined, 4));
      res.send(doc);
    },
    e => {
      console.log("Unable to save", e);
    }
  );
  res.render("updatedstudent", updatedStudent);
  res.end();
});

app.delete("/api/:id", (req, res) => {
  // Student.findByIdAndRemove();
  // Student.findOneAndRemove();

  const id = req.params.id;
  //remove clean the collection if a filter paramater is not passed
  //remove doesn't return the remove object

  Student.findByIdAndRemove(id).then(
    doc => {
      res.send(doc);
    },
    e => {
      res.status(400).send(e);
    }
  );
  // console.log(id);
  // Student.findByIdAndRemove(id)
  //   // .findById(id)
  //   // .then(res => res.remove()
  //   .then(() => res.json({ success: true }))
  //   .catch(err => res.status(404).json({ success: false }));

  // it removes the first document and return the removed document
  // Student.findOneAndRemove({ name: id }).then(
  //   doc => {
  //     res.send(doc);
  //   },
  //   e => {
  //     res.status(400).send(e);
  //   }
  // );

  // find by ID and remove and return the removed document
  // Student.findByIdAndRemove({ _id: id }).then(
  //   doc => {
  //     res.send(doc);
  //   },
  //   e => {
  //     res.status(400).send(e);
  //   }
  // );
});

app.listen(port, () => {
  console.log("Server is running on port" + port);
});
