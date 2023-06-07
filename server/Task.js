import mongoose from "mongoose";

const Task = new mongoose.Schema({
  _id: { type: Object },
  text: { type: String, required: true },
  checked: { type: Boolean, required: true },
});

export default mongoose.model("Task", Task);
