import mongoose from "mongoose";
import colors from "colors";
import { exit } from 'node:process';


export const connectDB = async () => {
    try {
        const {connection} = await mongoose.connect(process.env.DATABASE_URL);
        const url = `${connection.host}:${connection.port}`;
        console.log(`Connected to MongoDB ${url}`.magenta.bold);
    } catch (error) {
        //console.log(error.message);
        console.log('Error connecting to MongoDB. Exiting now...'.red.bold);
        exit(1);
    }
}