import mongoose from "mongoose";

const ConnectDB = async ()=> {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/EchoWave-DB")
        console.log("Connected To DB");
    } catch (error) {
      return  console.log("error", error);
    }
}

export default ConnectDB