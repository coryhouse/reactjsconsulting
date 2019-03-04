// Create a db.json file using mockData.js as the source.
// This way json-server has consistent data to serve upon app start.
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const mockData = require("./mockData");

const data = JSON.stringify(mockData);
const filepath = path.join(__dirname, "db.json");

fs.writeFile(filepath, data, function(err) {
  err ? console.log(err) : console.log("Mock DB created.");
});
