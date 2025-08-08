const mongoose = require("mongoose");
require("dotenv").config();

async function testConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");

    await mongoose.connect(
      process.env.MONGODB_URI || "mongodb://localhost:27017/nyaymanthan",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log("✅ Connected to MongoDB successfully!");

    // Test if we can query the database
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log(
      "📁 Available collections:",
      collections.map((c) => c.name)
    );

    await mongoose.disconnect();
    console.log("✅ Disconnected from MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

testConnection();
