import type { NextRequest } from "next/server";
import { getAgent } from "../../../_content/agents";
import { parseFormat, renderSubagentBody } from "../../../_lib/formats";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) {
    return new Response(`# Unknown agent: ${slug}\n`, {
      status: 404,
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  const format = parseFormat(request.nextUrl.searchParams.get("format"));
  const body = renderSubagentBody(agent, format);
  const contentType =
    format === "cursor"
      ? "text/plain; charset=utf-8"
      : "text/markdown; charset=utf-8";

  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "public, max-age=60",
      "X-Agent-Format": format,
    },
  });
}
