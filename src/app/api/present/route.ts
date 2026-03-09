import { NextRequest, NextResponse } from "next/server";

// In-memory state per room (works within same Vercel instance)
const rooms = new Map<string, { slide: number; qa: string; qaAnswer: string; qaTs: number; updatedAt: number }>();

// Clean up old rooms (>1 hour)
function cleanup() {
  const now = Date.now();
  for (const [key, val] of rooms) {
    if (now - val.updatedAt > 3600000) rooms.delete(key);
  }
}

// GET: Computer polls for current state
export async function GET(req: NextRequest) {
  const room = req.nextUrl.searchParams.get("room");
  if (!room) return NextResponse.json({ error: "room required" }, { status: 400 });

  cleanup();
  const state = rooms.get(room);
  if (!state) {
    return NextResponse.json({ slide: 0, qa: "", qaAnswer: "", qaTs: 0 });
  }
  return NextResponse.json(state);
}

// POST: Phone sends commands
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { room, slide, qa, qaAnswer, qaHide } = body;
    if (!room) return NextResponse.json({ error: "room required" }, { status: 400 });

    cleanup();
    const current = rooms.get(room) || { slide: 0, qa: "", qaAnswer: "", qaTs: 0, updatedAt: Date.now() };

    if (typeof slide === "number") {
      current.slide = slide;
    }
    if (qa) {
      current.qa = qa;
      current.qaAnswer = qaAnswer || "";
      current.qaTs = Date.now();
    }
    if (qaHide) {
      current.qa = "";
      current.qaAnswer = "";
      current.qaTs = Date.now();
    }
    current.updatedAt = Date.now();
    rooms.set(room, current);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
