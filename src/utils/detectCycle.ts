export function detectCycles(tasks: any[]) {
  const graph = new Map<string, string[]>();

  tasks.forEach(t => graph.set(t.id, t.dependencies));

  const visited = new Set<string>();
  const stack = new Set<string>();

  function dfs(node: string): boolean {
    if (stack.has(node)) return true;
    if (visited.has(node)) return false;

    visited.add(node);
    stack.add(node);

    for (const dep of graph.get(node) || []) {
      if (dfs(dep)) return true;
    }

    stack.delete(node);
    return false;
  }

  return tasks.some(t => dfs(t.id));
}
