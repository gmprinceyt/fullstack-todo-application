import mongoose  from "mongoose";

export const Connect = async () => {
    try {

        const instance = await mongoose.connect("mongodb://127.0.0.1:27017/todo");
        if(instance.connection.host){
            console.log("Database Connect Successfully ✅")
        }

    } catch (error) {
        console.log("Database Connection failed", error)
    }
}