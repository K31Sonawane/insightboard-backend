import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string(),
  description: z.string(),
  priority: z.enum(["Low", "Medium", "High"]),
  dependencies: z.array(z.string())
});

export const TasksSchema = z.array(TaskSchema);
