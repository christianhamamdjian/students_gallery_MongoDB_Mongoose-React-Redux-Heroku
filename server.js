const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const path = require("path");
const methodOverride = require("method-override");
const app = express();
const port = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "production") require("dotenv").config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB,
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
  photoId: {
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
app.use(express.static(__dirname + "/client/build"));
app.use(express.static(__dirname + "/client/build/css"));
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
  // Coudinary using dotenv
  cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
  });
  let fileName = req.body.alt;
  const newStudentBase = {
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
  if (req.file) {
    fileName = req.file.filename;
    cloudinary.uploader.upload(req.file.path, function(result) {
      let photoUrl = "/" + this.fileName;
      if (result.url) {
        photoUrl = result.url;
      }
      const newStudent = new Student({
        ...newStudentBase,
        photo: req.file,
        src: photoUrl,
        alt: fileName,
        photoId: result.public_id
      });
      newStudent
        .save()
        .then(doc => {
          console.log("Saved");
          console.log(JSON.stringify(doc, undefined, 4));
          res.json(doc);
        })
        .catch(e => {
          console.log("Unable to save", e);
        });
    });
  } else {
    const newStudent = new Student({
      ...newStudentBase,
      photo: "",
      src: "",
      alt: "",
      photoId: ""
    });
    newStudent
      .save()
      .then(doc => {
        console.log("Saved");
        console.log(JSON.stringify(doc, undefined, 4));
        res.json(doc);
      })
      .catch(e => {
        console.log("Unable to save", e);
      });
  }
});

app.put("/api/update/:id", upload.single("photo"), (req, res) => {
  const id = req.params.id;
  cloudinary.config({
    cloud_name: process.env.CLOUDNAME,
    api_key: process.env.APIKEY,
    api_secret: process.env.APISECRET
  });
  let fileName = req.body.alt;
  const newStudentBase = {
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
  if (req.file) {
    fileName = req.file.filename;
    cloudinary.uploader.upload(req.file.path, function(result) {
      let photoUrl = "/" + this.fileName;
      if (result.url) {
        photoUrl = result.url;
      }
      console.log("Photo src:", photoUrl);

      Student.findByIdAndUpdate(
        id,
        {
          ...newStudentBase,
          photo: req.file,
          src: photoUrl,
          alt: fileName,
          photoId: result.public_id
        },
        { new: true }
      )
        .then(doc => {
          console.log("Saved");
          console.log(JSON.stringify(doc, undefined, 4));
          res.json(doc);
        })
        .catch(e => {
          console.log("Unable to save", e);
        });
    });
  } else {
    Student.findByIdAndUpdate(
      id,
      {
        ...newStudentBase,
        photo: "",
        src: req.body.src,
        alt: req.body.alt,
        photoId: req.body.public_id
      },
      { new: true }
    )
      .then(doc => {
        console.log("Saved");
        console.log(JSON.stringify(doc, undefined, 4));
        res.json(doc);
      })
      .catch(e => {
        console.log("Unable to save", e);
      });
  }
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
