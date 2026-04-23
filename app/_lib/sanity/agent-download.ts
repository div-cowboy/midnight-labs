import type { SanityAgentForDownload } from "./types";

function yamlStringEscape(value: string): string {
  if (value.includes("\n") || value.includes('"') || value.includes(":")) {
    return `"${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return value;
}

export function renderAgentMarkdown(agent: SanityAgentForDownload): string {
  const lines: string[] = ["---"];
  lines.push(`name: ${agent.slug}`);
  if (agent.description) {
    lines.push(`description: ${yamlStringEscape(agent.description)}`);
  }
  if (agent.model) {
    lines.push(`model: ${agent.model}`);
  }
  if (agent.tools && agent.tools.length > 0) {
    lines.push(`tools: ${agent.tools.join(", ")}`);
  }
  lines.push("---");
  lines.push("");
  lines.push((agent.systemPrompt ?? "").trim());
  lines.push("");
  return lines.join("\n");
}
