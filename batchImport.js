const fs = require("file-system");
const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const greetings = JSON.parse(fs.readFileSync("data/greetings.json"));
console.log("greeting", greetings);

const batchImport = async () => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("exercise_1");
    console.log("connected!");
    console.log("greetings length", greetings.length);

    const r = await db.collection("greetings").insertMany(greetings);
    assert.equal(greetings.length, r.insertedCount);
  } catch (err) {
    console.log("error", err);
  }
  console.log("greetings", greetings);
  client.close();
  console.log("disconnected!");
};

batchImport();
