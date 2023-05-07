const { Pool } = require("pg");

const client = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ToDoApp",
  password: "root",
  port: "5432",
});

// note: we don't try/catch this because if connecting throws an exception
// we don't need to dispose of the client (it will be undefined)

const date = new Date("05/05/2023");
const formattedDate = date.toLocaleDateString("en-GB");

const insertQuery = {
  text: "INSERT INTO todoapp (id, text, date, completed) VALUES ($1, $2, $3, $4)",
  values: ["1", "Testing", formattedDate, false],
};

client.connect();

client
  .query(insertQuery)
  .then(() => console.log("Data inserted successfully"))
  .catch((err) => console.error(err))
  .finally(() => client.end());
