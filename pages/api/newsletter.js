// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {connectDB, insertDoc } from '../../helpers/db-util'

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    let client;

    try{
      client = await connectDB()
    }catch (error) {
      res.status(500).json({message: "Connecting to Database failed"})
      return;
    }

    try{
      await insertDoc(client, "newsletter", {email: userEmail})
      // client.close();
    }catch (error) {
      res.status(500).json({message: "Inserting to Database failed"})
    }

    res.status(201).json({ message: 'Signed up!' });
  }
}
