import { NextResponse, type NextRequest } from "next/server";
import { getAgentForDownload } from "@/app/_lib/sanity/fetch";
import { renderAgentMarkdown } from "@/app/_lib/sanity/agent-download";
import type { SanityAgentForDownload } from "@/app/_lib/sanity/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const agent = (await getAgentForDownload(slug)) as SanityAgentForDownload | null;

  if (!agent) {
    return NextResponse.json({ error: "Agent not found" }, { status: 404 });
  }

  const body = renderAgentMarkdown(agent);
  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${slug}.md"`,
      "Cache-Control": "no-store",
    },
  });
}
