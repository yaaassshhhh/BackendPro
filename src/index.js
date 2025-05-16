import dotenv from "dotenv";
dotenv.config({
    path : './.env'
});
import connectDB from "./db/index.js";
import { app } from "./app.js";


connectDB()
.then(() => {
    
    app.on("error", (err) => {
        console.log("\n Error in server connection:", err);
        process.exit(1);
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`\n MongoDB connected successfully`);
        console.log(`\n Server is running on port ${process.env.PORT || 8000}`);
    })
})
.catch((err) => {
    console.log("\n Failed connection to MongoDB:", err);
    process.exit(1);
})