import mongoose from "mongoose";

async function connectToMongo() {
  try {
    const conn = await mongoose.connect(
      process.env.DB_LINK,
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
