const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getUsers = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  console.log("client", client);

  await client.connect();

  const db = client.db("database_1");
  const users = await db.collection("users").find().toArray();
  console.log("users", users);
  client.close();
  console.log("disconnected!");

  if (users.length) {
    res.status(200).send(users);
  } else {
    res.status(404);
  }
};
module.exports = { getUsers };
