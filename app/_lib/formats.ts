import type { Agent } from "../_content/agents";
import type { InstallFormat } from "./stats";

export function parseFormat(raw: string | null | undefined): InstallFormat {
  return raw === "cursor" ? "cursor" : "claude";
}

export function targetPath(agent: Agent, format: InstallFormat): string {
  if (format === "cursor") return `.cursor/rules/${agent.slug}.mdc`;
  return `.claude/agents/${agent.slug}.md`;
}

export function targetDir(format: InstallFormat): string {
  if (format === "cursor") return ".cursor/rules";
  return ".claude/agents";
}

export function formatLabel(format: InstallFormat): string {
  return format === "cursor" ? "Cursor" : "Claude Code";
}

function stripFrontmatter(md: string): string {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n\r?\n?/, "");
}

export function renderSubagentBody(
  agent: Agent,
  format: InstallFormat,
): string {
  if (format === "cursor") {
    const body = stripFrontmatter(agent.subagent.systemPrompt);
    return `---
description: ${agent.subagent.description}
alwaysApply: false
---

${body}`;
  }
  return agent.subagent.systemPrompt;
}
