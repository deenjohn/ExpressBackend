const { Pool } = require("pg");

const client = new Pool({
  user: "postgres",
  host: "localhost",
  database: "ToDoApp",
  password: "root",
  port: "5432",
});

client.connect();

const createTableQuery = `
  CREATE TABLE TodoApp (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    date DATE NOT NULL,
    completed BOOLEAN NOT NULL
  )
`;

client.query(createTableQuery)
  .then(() => console.log('Table created successfully'))
  .catch((err) => console.error(err))
  .finally(() => client.end());
