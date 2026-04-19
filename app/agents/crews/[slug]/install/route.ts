import type { NextRequest } from "next/server";
import { bundleAgents, getBundle } from "../../../../_content/bundles";
import {
  formatLabel,
  parseFormat,
  targetDir,
  targetPath,
} from "../../../../_lib/formats";
import { logInstall } from "../../../../_lib/stats";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) {
    return new Response(`# Unknown crew: ${slug}\n`, {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const format = parseFormat(request.nextUrl.searchParams.get("format"));
  const origin = request.nextUrl.origin;
  const qs = format === "claude" ? "" : `?format=${format}`;
  const dir = targetDir(format);
  const label = formatLabel(format);
  const members = bundleAgents(bundle);

  const installLines = members
    .map((a) => {
      const src = `${origin}/agents/${a.slug}/subagent${qs}`;
      const out = targetPath(a, format);
      return `curl -fsSL "${src}" -o "${out}"
printf "  \\033[1;32m✓\\033[0m ${a.name}\\n"`;
    })
    .join("\n");

  const script = `#!/bin/sh
# Midnight AI — install ${bundle.name} (${bundle.codename}) for ${label}
# ${bundle.tagline}
set -e

mkdir -p "${dir}"

printf "\\nDeploying \\033[1m${bundle.name}\\033[0m for ${label}...\\n\\n"
${installLines}
printf "\\n\\033[1;32m✓\\033[0m Crew deployed. ${members.length} agents in ${dir}\\n"
printf "  Restart your editor to pick them up.\\n\\n"
`;

  void logInstall({
    type: "crew",
    slug: bundle.slug,
    agentSlugs: bundle.agentSlugs,
    format,
    ua: request.headers.get("user-agent"),
  });

  return new Response(script, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Crew-Format": format,
    },
  });
}
