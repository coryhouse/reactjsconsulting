/* NOTE: This isn't actually used (This example lacks a backing store, which json-server includes), 
but is an example of a simple Express-based API. */
/* eslint-disable no-console */
const express = require("express");
const cors = require("cors");

const app = express();

// Uncomment to enable CORS
// app.use(cors());

let users = [
  { id: 1, firstName: "Bob", lastName: "Smith", email: "bob@gmail.com" },
  { id: 2, firstName: "Tami", lastName: "Norton", email: "tnort@gmail.com" },
  { id: 3, firstName: "Tina", lastName: "Lee", email: "lee.tina@hotmail.com" }
];

app.get("/users", function(req, res) {
  res.json(users);
});

app.delete("/users/:id", function(req, res) {
  users = users.filter(u => u.id !== req.params.id);
  res.json({ response: "UserID " + req.params.id + " deleted." });
});

app.listen(3001, function(err) {
  err ? console.log(err) : console.log("Running on port 3001");
});
