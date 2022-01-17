import { connectDB, insertDoc, getAllDoc } from "../../../helpers/db-util";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDB();
  } catch (error) {
    res.status(500).json("Database connecting failed");
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      !name.trim() === "" ||
      !text ||
      !text.trim() === ""
    ) {
      res.status(422).json({ message: "invalid input" });
    //   client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;
    try {
      result = await insertDoc(client, "comments", newComment);
      newComment._id = result.insertedId;

      res.status(201).json({ message: "Added Comment.", comment: newComment });
    } catch (error) {
      res.status(500).json("Inserting document failed");
    }
  }

  if (req.method === "GET") {
    try {
      const result = await getAllDoc(client, "comments", { _id: -1 });
      res.status(200).json({ comments: result });
    } catch (error) {
      res.status(500).json({ message: "Failed to get Comments" });
    }
  }

//   client.close();
}
