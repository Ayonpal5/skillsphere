import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const dataFile = path.join(process.cwd(), "src", "data", "courses.json");

export async function GET() {
  try {
    const raw = await fs.readFile(dataFile, "utf-8");
    return NextResponse.json(JSON.parse(raw));
  } catch (e) {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const raw = await fs.readFile(dataFile, "utf-8").catch(() => "[]");
    const arr = JSON.parse(raw);
    arr.push(body);
    await fs.mkdir(path.dirname(dataFile), { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify(arr, null, 2), "utf-8");
    return NextResponse.json(body, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: "failed" }, { status: 500 });
  }
}
