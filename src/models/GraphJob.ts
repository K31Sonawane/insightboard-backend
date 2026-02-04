import mongoose from "mongoose";

const GraphJobSchema = new mongoose.Schema({
  transcript: { type: String, unique: true },
  status: {
    type: String,
    enum: ["pending", "processing", "done", "error"],
    default: "pending"
  },
  result: Object,
  error: String
}, { timestamps: true });

export default mongoose.model("GraphJob", GraphJobSchema);
