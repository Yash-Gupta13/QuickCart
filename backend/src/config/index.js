import mongoose from "mongoose";

export const connectDb = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log(
          `\nMongoDB Connected ✅ !! DB Host : ${connectionInstance.connection.host} `
        );
    } catch (error) {
        console.log("Database connection failed ❌ ");
        process.exit(1);
    }
}