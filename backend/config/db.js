const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Database is connected ${mongoose.connection.host}`.bgCyan.white
    );
  } catch (error) {
    console.log(`error while connecting in database ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
