const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const StudentSchema = new Schema({
  photo: { data: Buffer, contentType: String },
  src: {
    type: String,
  },
  alt: {
    type: String,
  },
  photoId: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  message: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

module.exports = Student = mongoose.model("student", StudentSchema);
