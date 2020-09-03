const { MongoClient } = require("mongodb");
const assert = require("assert");
const { paginateModel } = require("./utils");

// console.log("mongo client", MongoClient);

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const createGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("exercises");
    console.log("connected!");

    // await db.collection("greetings").insertOne(req.body);

    const r = await db.collection("greetings").insertOne(req.body);
    assert.equal(1, r.insertedCount);

    res.status(201).json({ status: 201, data: req.body });
  } catch {
    res.status(500).json({ status: 500, data: req.body, message: err.message });
  }
  client.close();
  console.log("disconnected!");
  // console.log(req.body);
  // res.status(200).json("ok");
};

const getGreeting = async (req, res) => {
  // console.log("req.params", req.params);
  const _id = req.params._id;
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");

  db.collection("greetings").findOne({ _id }, (err, result) => {
    result
      ? res.status(200).json({ status: 200, _id, data: result })
      : res.status(404).json({ status: 404, _id, data: "Not Found" });
    client.close();
  });
  // res.status(200).json("bacon");
};

const getGreetings = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();
  const db = client.db("exercise_1");
  console.log("connected!");

  const greetings = await db.collection("greetings").find().toArray();

  const start = Number(req.query.start);
  const limit = Number(req.query.limit);

  const paginatedResult = paginateModel(greetings, start, limit);

  client.close();
  console.log("client closed!");

  res.status(200).json({ status: 200, paginatedResult });
};

const deleteGreeting = async (req, res) => {
  const client = await MongoClient(MONGO_URI, options);
  console.log("req.params.id", req.params._id);
  try {
    await client.connect();
    const db = client.db("exercise_1");
    console.log("connected!");

    // await db.collection("greetings").insertOne(req.body);

    const r = await db
      .collection("greetings")
      .deleteOne({ _id: req.params._id });
    // assert.equal(1, r.deleteCount);

    client.close();
    console.log("disconnected!");
    res.status(204).json({ status: 204, data: req.params });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ status: 500, data: req.params });
  }

  // console.log(req.body);
  // res.status(200).json("ok");
};

module.exports = { createGreeting, getGreeting, getGreetings, deleteGreeting };
