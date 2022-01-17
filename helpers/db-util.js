const { MongoClient } = require("mongodb");

export async function connectDB() {
  const client = await MongoClient.connect(
    "mongodb+srv://eventList:Asdf1234@cluster0.70s8n.mongodb.net/EventsSite?retryWrites=true&w=majority"
  );
  return client;
}

export async function insertDoc(client, collection, doc) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(doc);

  return result;
}

export async function getAllDoc(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).
  find().
  sort(sort).
  toArray();

  return documents;
}

export async function getSelectedDoc(client, query, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).
  find(query).
  sort(sort).
  toArray();

  return documents;
}
