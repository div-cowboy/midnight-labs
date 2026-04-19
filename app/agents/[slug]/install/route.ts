import type { NextRequest } from "next/server";
import { getAgent } from "../../../_content/agents";
import { formatLabel, parseFormat, targetDir, targetPath } from "../../../_lib/formats";
import { logInstall } from "../../../_lib/stats";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) {
    return new Response(`# Unknown agent: ${slug}\n`, {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const format = parseFormat(request.nextUrl.searchParams.get("format"));
  const origin = request.nextUrl.origin;
  const sourceQs = format === "claude" ? "" : `?format=${format}`;
  const source = `${origin}/agents/${agent.slug}/subagent${sourceQs}`;
  const dir = targetDir(format);
  const target = targetPath(agent, format);
  const label = formatLabel(format);

  const script = `#!/bin/sh
# Midnight AI — install ${agent.name} (${agent.codename}) for ${label}
# ${agent.tagline}
# Source: ${source}
set -e

TARGET_DIR="${dir}"
TARGET_FILE="${target}"

mkdir -p "$TARGET_DIR"
curl -fsSL "${source}" -o "$TARGET_FILE"

printf "\\n\\033[1;32m✓\\033[0m Installed \\033[1m${agent.name}\\033[0m (${label}) to %s\\n" "$TARGET_FILE"
printf "  Restart your editor to pick it up.\\n\\n"
`;

  // Fire-and-forget log; failures shouldn't block the install.
  void logInstall({
    type: "agent",
    slug: agent.slug,
    format,
    ua: request.headers.get("user-agent"),
  });

  return new Response(script, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Agent-Target": target,
      "X-Agent-Format": format,
    },
  });
}
