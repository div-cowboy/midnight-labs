import { mkdir, appendFile } from "node:fs/promises";
import { join } from "node:path";

const DATA_DIR = join(process.cwd(), "data");
const UNLOCKS_FILE = join(DATA_DIR, "unlocks.ndjson");

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { email, slug } =
    typeof body === "object" && body !== null
      ? (body as { email?: unknown; slug?: unknown })
      : {};

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return Response.json(
      { error: "Please enter a valid email." },
      { status: 400 },
    );
  }

  const record = {
    email: email.trim().toLowerCase(),
    slug: typeof slug === "string" ? slug : null,
    ts: new Date().toISOString(),
    ua: request.headers.get("user-agent") ?? null,
  };

  try {
    await mkdir(DATA_DIR, { recursive: true });
    await appendFile(UNLOCKS_FILE, JSON.stringify(record) + "\n", "utf8");
  } catch (err) {
    console.error("[unlock] failed to persist", err);
    return Response.json({ error: "Could not save." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
