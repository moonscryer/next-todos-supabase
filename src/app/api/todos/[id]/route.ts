import { updateTodo, deleteTodo, checkTodo } from "@/queries";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { task } = await req.json();
  const updated = await updateTodo(Number(params), task);
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const deleted = await deleteTodo(Number(params));
    return NextResponse.json(deleted); // ✅ Make sure this is returned!
  } catch (e) {
    console.error("Error deleting todo:", e);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const updated = await checkTodo(Number(params));
  return NextResponse.json(updated);
}
