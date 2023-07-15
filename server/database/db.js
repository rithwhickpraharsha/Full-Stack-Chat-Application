//mongoose can connect mongo db and express app create a backend connection
import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const Connection = async() => {
    const URL = `mongodb://${USERNAME}:${PASSWORD}@ac-8s3ylkl-shard-00-00.j5dkz9x.mongodb.net:27017,ac-8s3ylkl-shard-00-01.j5dkz9x.mongodb.net:27017,ac-8s3ylkl-shard-00-02.j5dkz9x.mongodb.net:27017/?ssl=true&replicaSet=atlas-royfka-shard-0&authSource=admin&retryWrites=true&w=majority`;
    try{
        //useunified topology provides latest connections info
     await mongoose.connect(URL,{useUnifiedTopology : true})
     console.log("Database Connected Successfully");
    }catch(err){
        console.log("ERROR Connecting to db",err.message);
    }
}

export default Connection;