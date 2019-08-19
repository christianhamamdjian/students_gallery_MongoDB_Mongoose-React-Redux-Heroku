const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary");
const multer = require("multer");
const config = require("config");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

// Multer
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

// @route   GET api/
// @desc    Get All Students
// @access  Public
router.get("/", (req, res) => {
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

// @route   GET api/students
// @desc    Get All Students
// @access  Public
router.get("/api/students", (req, res) => {
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

// @route   GET api/student/:id
// @desc    Get A Single Student
// @access  Public
router.get("/api/students/:id", (req, res) => {
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

// @route   POST api/newstudent
// @desc    Create A Student
// @access  Private
router.post("/api/newstudent", upload.single("photo"), (req, res) => {
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
    message: req.body.message
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
        // console.log("Saved");
        // console.log(JSON.stringify(doc, undefined, 4));
        res.json(doc);
      })
      .catch(e => {
        console.log("Unable to save", e);
      });
  }
});

// @route   PUT api/update/:id
// @desc    Update A Student
// @access  Private
router.put("/api/update/:id", upload.single("photo"), (req, res) => {
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
    message: req.body.message
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

// @route   DELETE api/:id
// @desc    Delete A Student
// @access  Private
router.delete("/api/:id", (req, res) => {
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

module.exports = router;
