import { connect } from "./connect";
import { Todo } from "./types";

/* ───────── helpers ───────── */

function assert(error: unknown): asserts error is never {
  if (error) throw error;
}

/* ───────── CRUD ───────── */

export const getAllTodos = async (): Promise<Todo[]> => {
  const supabase = connect();
  const { data, error } = await supabase
    .from("todos")
    .select("id, task, checked")
    .order("id", { ascending: true });

  assert(error);
  return data ?? [];
};

export const addTodo = async (task: string): Promise<Todo> => {
  const supabase = connect();

  const { data, error } = await supabase
    .from("todos")
    .insert({ task }) // column defaults (checked = false) apply
    .select("id, task, checked") // `select(...)` returns the inserted row(s)
    .single();

  assert(error);
  return data;
};

export const updateTodo = async (id: number, task: string): Promise<Todo> => {
  const supabase = connect();

  const { data, error } = await supabase
    .from("todos")
    .update({ task })
    .eq("id", id)
    .select("id, task, checked")
    .single();

  assert(error);
  return data;
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  const supabase = connect();

  // PostgREST patch/delete can return rows when you add `.select()`
  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .select("id, task, checked")
    .single();

  assert(error);
  return data;
};

export const checkTodo = async (id: number): Promise<Todo> => {
  const supabase = connect();

  // ✅ 1. Get current state (typed)
  const { data: current, error: readError } = await supabase
    .from("todos")
    .select("checked")
    .eq("id", id)
    .single<Pick<Todo, "checked">>();

  if (readError) throw readError;
  if (!current) throw new Error("Todo not found");

  const newCheckedValue = !current.checked;

  // ✅ 2. Update to the opposite state
  const { data: updated, error: updateError } = await supabase
    .from("todos")
    .update({ checked: newCheckedValue })
    .eq("id", id)
    .select()
    .single<Todo>();

  if (updateError) throw updateError;
  if (!updated) throw new Error("Update failed");

  return updated;
};
