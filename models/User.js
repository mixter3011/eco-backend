import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    usage: [Object]
})

const user = mongoose.model("User", userSchema);

export default user;
