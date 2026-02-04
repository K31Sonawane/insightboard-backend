export function generateTasksFromTranscript() {
  return [
    { id: "T1", description: "Design UI", priority: "High", dependencies: [] },
    { id: "T2", description: "Build API", priority: "High", dependencies: ["T1"] },
    { id: "T3", description: "Frontend connect", priority: "Medium", dependencies: ["T2", "T99"] } // T99 fake
  ];
}
