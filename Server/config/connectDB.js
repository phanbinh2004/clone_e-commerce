const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery",false);
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    if (connect.connection.readyState === 1) {
      console.log("DB connect successfully!");
    } else {
      console.log("DB connect failed!");
    }
  } catch (error) {
    console.log("connect failed ", error);
    throw new Error(error);
  }
};

module.exports = connectDB;
