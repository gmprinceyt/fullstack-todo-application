import mongoose from "mongoose";
import { environmentVariables } from "./index.js";

export const Connect = async () => {
  try {
    const instance = await mongoose.connect(environmentVariables.MongoDB_URL);
    if (instance.connection.host) {
      console.log("Database Connect Successfully ✅");
    }
  } catch (error) {
    console.log("Database Connection failed", error);
    process.exit(1)
  }
};
