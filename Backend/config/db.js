const { MongoClient } = require('mongodb');

const uri = process.env.DATABASE_URL;

if (!uri) {
  throw new Error("DATABASE_URL environment variable is required");
}

const client = new MongoClient(uri);

let db;

const connectDB = async () => {
  await client.connect();
  db = client.db(process.env.DATABASE_NAME || "womensalon");
  console.log("MongoDB Connected");
};

const getDB = () => db;

module.exports = { connectDB, getDB };
