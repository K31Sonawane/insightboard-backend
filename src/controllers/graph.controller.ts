import Project from "../models/Project";
import { generateTasksFromTranscript } from "../services/geminiLLM";
import { sanitizeDependencies } from "../utils/validateDependencies";
import { detectCycles } from "../utils/detectCycle";

export async function createGraph(req: any, res: any) {
  try {
    const { transcript } = req.body;

    let tasks = await generateTasksFromTranscript(transcript);

    tasks = sanitizeDependencies(tasks);
    const hasCycle = detectCycles(tasks);

    if (hasCycle) {
      tasks = tasks.map((t: any) => ({
        ...t,
        status: "Blocked/Error"
      }));
    }

    const project = await Project.create({
      transcript,
      tasks
    });

    res.json(project);

  } catch (err: any) {
    res.status(500).json({
      error: "Failed to generate dependency graph",
      details: err.message
    });
  }
}
