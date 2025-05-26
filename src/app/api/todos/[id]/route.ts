import { updateTodo, deleteTodo, checkTodo } from "@/queries";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { task } = await req.json();
  const updated = await updateTodo(Number(params.id), task);
  return NextResponse.json(updated);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const deleted = await deleteTodo(Number(params.id));
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
  { params }: { params: { id: string } }
) {
  const updated = await checkTodo(Number(params.id));
  return NextResponse.json(updated);
}
