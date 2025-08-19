import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { environmentVariables } from "../config/index.js";

const schema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullname is required"],
      minLength: [3, "Minium 3 length"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      minLength: [3, "Minium 3 length"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [3, "Minium 3 length"],
    },
  },
  { timestamps: true }
);


schema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next(); // if not modified, proceed without hashing
  }

  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    next(); // Proceed with saving the document
  } catch (error) {
    if (error instanceof Error) {
      next(error);
    } else {
      next(new Error("Unknown error occurred while hashing password"));
    }
  }
});

schema.methods.SignJWT = function () {
  const token = jwt.sign(this._id, environmentVariables.JWT_Private_Key);
  return token;
};



export const User = mongoose.model("User", schema);
