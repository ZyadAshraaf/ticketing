
import mongoose, { mongo } from "mongoose";
import { app } from "./app";

const start = async () => {
    if(!process.env.JWT_KEY){
        throw new Error('JWT_KEY is not defined');
    }
    try {
        await mongoose.connect("mongodb://auth-mongo-srv:27017/auth"); //auth-mongo-srv:27017 came from auth-mongo service metadata name
        console.log("Connected to mongo db!!!!!");
    } catch (err) {
        console.log(err);
    }

};


app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!");
});

start();
