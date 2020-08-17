const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const getCollection = async (dbName) => {
  const client = await MongoClient(MONGO_URI, options);

  await client.connect();

  const db = client.db(dbName);
  const users = await db.collection("users").find().toArray();
  console.log("users", users);
  client.close();
  console.log("disconnected!");
};

getCollection("database_1");
/* 
client communicates with mongo 
client has establisehd communication with mongo
line 14: client has connection with mongodb
you could have multile, so 16 tells you which db to use
now you're connected to the database
17: in a db, you have multiple collections; so you go to users connection, and .find finds
everything, and .toArray converts wtv you found and puts it in an array
*/
