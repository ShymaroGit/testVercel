const mongoose = require("mongoose");
const { Schema, model } = mongoose;
/*const uri =
  "mongodb+srv://Shymaro:shiori91011@clusterdevtest.bzpowgd.mongodb.net/Notes?retryWrites=true&w=majority&appName=ClusterDevTest";*/
const uri =
  "mongodb+srv://vercel-admin-user:gS41X5Q39zNSEftf@clusterdevtest.bzpowgd.mongodb.net/Notes?retryWrites=true&w=majority&appName=ClusterDevTest";
const InfoShema = new Schema({
  name: String,
});

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
    await mongoose.connect(uri);
    const t = new NotesList({ name: "Marino" });
    await t.save();

    /*let data = await mongoose /*.db("Notes")
      .collection("NotesList")
      .find()
      .toArray();*/
    res.json(t);
  } finally {
    await mongoose.disconnect();
  }
};

module.exports = (app) => {
  app.get("/api/mongo", getData);
};
