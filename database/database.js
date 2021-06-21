const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

const db = mongoose.connection;

db.once("open", () => {
  console.log("database connected ");
}).catch((err) => {
  console.log(err);
});

module.exports = db;
