import mongoose from "mongoose";
import "dotenv/config";

let MongoUri = process.env.MONGO_URI;

export default function Db() {
    mongoose.connect(MongoUri)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((e) => {
            console.error("Error connecting to MongoDB:", e.message);
        });
}
