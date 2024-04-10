import mongoose from "mongoose";

const ConnectDB = async ()=> {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected To DB");
    } catch (error) {
      return  console.log("error", error);
    }
}

export default ConnectDB