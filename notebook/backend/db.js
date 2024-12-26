const mongoose = require('mongoose');

// MongoDB URI (include the database name at the end)
const mongoURI = "mongodb+srv://shreyash:Shreyash%40123@cluster0.xzlmk.mongodb.net/inotebook?retryWrites=true&w=majority";

// Function to connect to MongoDB
const connectToMongo = async () => {  
  try {
    await mongoose.connect(mongoURI, {
     
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
};

module.exports = connectToMongo;