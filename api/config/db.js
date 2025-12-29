import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Direct MongoDB Compass connection string
    const mongoURI = "mongodb://127.0.0.1:27017/campus_diaries"; 
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Error: ${err.message}`);
    process.exit(1);
  }
};

export default connectDB;
