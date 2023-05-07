// db.js

async function insertInto(client, {id, text, date, completed }) {
 
  const insertQuery = {
    text: "INSERT INTO todoapp (id, text, date, completed) VALUES ($1, $2, $3, $4)",
    values: [id, text, date, completed],
  };

  try {
    await client.query(insertQuery);
    console.log("Data inserted successfully");
  } catch (err) {
    console.error(err);
  } finally {
    client.end();
  }
}

async function getData(client) {
  const selectQuery = {
    text: "SELECT id, text, date, completed FROM todoapp",
  };

  try {
    const res = await client.query(selectQuery);
    console.log("data from table ", res.rows);
    return res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    
  }
}

module.exports = { insertInto, getData };
