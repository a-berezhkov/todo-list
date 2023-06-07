import mongoose from "mongoose";

const Task = new mongoose.Schema({
  text: { type: String, required: true },
  checked: { type: Boolean, required: true },
});

export default mongoose.model("Task", Task);
