import mongoose from "mongoose";

const schema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true, "fullname is required"],
        minLength: [3, "Minium 3 length"],
    },
    email: {
        type:String,
        required: [true, "email is required"],
        minLength: [3, "Minium 3 length"],   
        unique: true ,
        lowercase: true
    },
    password: {
        type:String,
        required: [true, "password is required"],
        minLength: [3, "Minium 3 length"],   
    }
},{timestamps: true});

export const User = mongoose.model("User", schema);