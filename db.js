import mongoose from "mongoose";

const connectToDB = (uri) => {
    return mongoose.connect(uri);
}

export default connectToDB;