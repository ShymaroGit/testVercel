const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { MongoClient, ServerApiVersion } = require("mongodb");

const InfoShema = new Schema({
  name: String,
});

const client = new MongoClient(process.env.MONGODB_URI);

const NotesList = model("NotesList", InfoShema);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await mongoose.connect(uri);
    // Send a ping to confirm a successful connection
    await mongoose.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await mongoose.disconnect();
  }
}

const getData = async (req, res) => {
  try {
    /* await mongoose.connect(uri);
    const t = new NotesList({ name: "Marino" });
    await t.save();*/
    await client.connect();
    let data = await client
      .db("Notes")
      .collection("noteslists")
      .find()
      .toArray();
    res.json(data);
  } finally {
    await mongoose.disconnect();
  }
};

module.exports = (app) => {
  app.get("/api/mongo", getData);
};
