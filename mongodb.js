const { MongoClient, ObjectID } = require("mongodb");
const studentsData = require("./photosinfo.js");
MongoClient.connect(
  "mongodb://localhost:27017/StudentInfo",
  (err, client) => {
    if (err) {
      console.log("Unable to connect to MongoDB server");
    }
    console.log("Connnected to mongodb server");
    const db = client.db("StudentInfo");

    // db.collection("Student").insert(studentsData.photosInfo, (err, data) => {
    //   if (err) {
    //     console.log("Data was not added", err);
    //   }
    //   console.log(JSON.stringify(data.ops, undefined, 4));
    // });

    // db.collection("Student").find({ firstName: "Chris" }, (err, data) => {
    //   if (err) {
    //     console.log("Data was not added", err);
    //   }
    //   console.log(JSON.stringify(data.ops, undefined, 4));
    // });

    // db.collection("Student").insertMany(
    //   [
    //     {
    //       name: "Joe",
    //       age: 76,
    //       country: "Finland"
    //     },
    //     {
    //       name: "Jeff",
    //       age: 24,
    //       country: "Finland"
    //     }
    //   ],
    //   (err, data) => {
    //     if (err) {
    //       console.log("Data was not added", err);
    //     }
    //     console.log(JSON.stringify(data.ops, undefined, 4));
    //   }
    // );
    // db.collection("Student").find({});

    // db.collection("Student")
    //   .find()
    //   .toArray()
    //   .then(
    //     doc => {
    //       console.log(JSON.stringify(doc, undefined, 4));
    //     },
    //     err => {
    //       console.log("Not found", err);
    //     }
    //   );

    // db.collection("Student")
    //   .find({ name: "name" })
    //   .toArray()
    //   .then(
    //     doc => {
    //       console.log(JSON.stringify(doc, undefined, 4));
    //     },
    //     err => {
    //       if (err) {
    //         console.log("data was not found");
    //       }
    //     }
    //   );

    // db.collection("Student")
    //   .find({ _id: new ObjectID("5b5841ca32f7a2fc5882e3d8") })
    //   .count()
    //   .then(
    //     count => {
    //       // console.log(JSON.stringify(doc,undefined,4))
    //       console.log("Number of students", count);
    //     },
    //     err => {
    //       if (err) {
    //         console.log("data was not found");
    //       }
    //     }
    //   );
    client.close();
  }
);
