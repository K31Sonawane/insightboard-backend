import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
  id: String,
  description: String,
  priority: String,
  dependencies: [String],
  status: { type: String, default: "OK" }
});

const ProjectSchema = new mongoose.Schema({
  transcript: String,
  tasks: [TaskSchema]
});

export default mongoose.model("Project", ProjectSchema);
