import { NextResponse } from "next/server";
import { getAllTodos } from "@/queries";

export async function GET() {
  try {
    const todos = await getAllTodos();
    return NextResponse.json(todos);
  } catch (e) {
    console.error("Error fetching todos:", e);
    return NextResponse.json(
      { error: "Failed to fetch todos" },
      { status: 500 }
    );
  }
}
