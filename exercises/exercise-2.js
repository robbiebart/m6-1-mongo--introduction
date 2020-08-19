const { MongoClient } = require("mongodb");
const assert = require("assert");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  try {
    const client = await MongoClient(MONGO_URI, options);

    await client.connect();
    const db = client.db("exercises");
    console.log("connected!");

    // await db.collection("greetings").insertOne(req.body);

    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);

    client.close();
    console.log("disconnected!");

    res.status(201).json({ status: 201, data: req.body });
  } catch {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  // console.log(req.body);
  // res.status(200).json("ok");
};

const getGreeting = async (req, res) => {
  const _id = req.param._id;
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercises");

  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
  // res.status(200).json("bacon");
};

module.exports = { createGreeting, getGreeting };
