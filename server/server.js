import path from "path";
import express from "express";
import { MongoClient } from "mongodb";

import devBundle from "./devBundle";
import template from "../template";

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

devBundle.compile(app);

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.get("/", (req, res) => {
  res.status(200).send(template());
});

let port = process.env.PORT || 3001;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info("Server started on port %s.", port);
});

const url =
  process.env.MONGODB_URI ||
  "mongodb+srv://cody:GFdPjfRLEEjuiVUQ@cluster0-uuofi.mongodb.net/mernSimpleSetup";

MongoClient.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, db) => {
    console.log("Connected successfully to mongodb server");
    db.close();
  }
);
