import { addTodo, checkTodo, deleteTodo, updateTodo } from "@/queries";
import { revalidatePath } from "next/cache";

export const createTodo = async (data: FormData) => {
  "use server";
  const task = (data.get("task") as string)?.trim();
  if (!task) return;
  await addTodo(task);
  revalidatePath("/");
};

export const saveTodo = (id: number) => {
  return async (data: FormData) => {
    "use server";
    const task = (data.get("task") as string)?.trim();
    if (!task) return;
    await updateTodo(id, task);
    revalidatePath("/");
  };
};

export async function toggleTodo(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  console.log("Toggling todo", id);
  if (!id) return;

  await checkTodo(id);
  revalidatePath("/");
}

export const removeTodo = (id: number) => {
  return async () => {
    "use server";
    await deleteTodo(id);
    revalidatePath("/");
  };
};
