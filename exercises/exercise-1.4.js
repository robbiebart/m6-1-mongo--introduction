const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db("database_1");
  await db.collection("users").insertOne(req.body);

  client.close();
  console.log("disconnected!");

  res.status(201).send({ success: true });
};

module.exports = { addUser };
