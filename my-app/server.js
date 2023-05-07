const express = require("express");
const bodyParser = require("body-parser");
//const cors = require('./corsMiddleware')

const { Pool } = require("pg");

const { getData , insertInto } = require("./utils");
const client = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ToDoApp",
  password: "root",
  port: "5432",
});

client.connect();

const app = express();
app.use(bodyParser.json());

var isPreflight = function (req) {
  var isHttpOptions = req.method === "OPTIONS";
  var hasOriginHeader = req.headers["origin"];
  var hasRequestMethod = req.headers["access-control-request-method"];
  return isHttpOptions && hasOriginHeader && hasRequestMethod;
};

let handleCors = function (req, res, next) {
  //allow cors
  // Access-Control-Allow-Origin control cors
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  //imp
  if (isPreflight(req)) {
    res.status(204).end();
    return;
  }
  next();
};

app.use(handleCors);

app.get("/", (req, res) => {
  res.status(200);
  res.send("start");
});

app.get("/todos", async (req, res) => {
  const result = await getData(client);
  console.log("result ", result);
  res.send(result);
});

app.post("/todos", async (req, res) => {
  console.log(req.body);
  // Do something with the data, e.g. save it to a database
  const data = req.body;
  if(!res.id) {
    res.send("Empty data")
  }
  const { id, text, date, completed } = data
  await insertInto(client,{id, text, date, completed} )
  res.send("User created successfully");
});

const port = 3001;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
