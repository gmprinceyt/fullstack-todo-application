import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    title : {
        type: String,
        required: [true, "Please Enter Title"]
    },
    description : {
        type: String,
        required: [true, "Please Enter description"]
    },
    complate: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
});

export const Todo = mongoose.model("Todo", Schema);