import Project from "../models/Project";
import GraphJob from "../models/GraphJob";
import { generateTasksFromTranscript } from "./geminiLLM";
import { sanitizeDependencies } from "../utils/validateDependencies";
import { detectCycles } from "../utils/detectCycle";
import { TasksSchema } from "../utils/taskSchema";

export async function processGraph(jobId: string) {
  const job = await GraphJob.findById(jobId);
  if (!job) return;

  try {
    // Mark job as running
    job.status = "processing";
    await job.save();

    if (!job.transcript) {
      throw new Error("Job transcript is missing");
    }
    const rawTasks = await generateTasksFromTranscript(job.transcript);

    const parsed = TasksSchema.safeParse(rawTasks);
    if (!parsed.success) {
      throw new Error("LLM returned invalid task schema");
    }

    let tasks = parsed.data;

    tasks = sanitizeDependencies(tasks);

    // logical cycles
    if (detectCycles(tasks)) {
      tasks = tasks.map(task => ({
        ...task,
        status: "Blocked/Error"
      }));
    }

    // 5️⃣ Persist clean graph
    const project = await Project.create({
      transcript: job.transcript,
      tasks
    });

    // Mark job completed
    job.status = "done";
    job.result = project;
    await job.save();

  } catch (err: any) {
    job.status = "error";
    job.error = err.message || "Graph processing failed";
    await job.save();
  }
}
