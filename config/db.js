import mongoose from "mongoose";

async function connectToMongo() {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://shreyash:Shreyash%40123@cluster0.xzlmk.mongodb.net/E-commerce", // Updated database name to 'E-commerce'
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connection is successful");
  } catch (error) {
    console.error("Connection failed", error.message);
  }
}

export default connectToMongo;
