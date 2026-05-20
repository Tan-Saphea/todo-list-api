const { default: mongoose } = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to database");
  } catch (error) {
    console.log("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDatabase;
