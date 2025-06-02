import { connect } from "./connect";
import { Todo } from "./types";

/* ───────── helpers ───────── */

function assert<T>(error: unknown): asserts error is never {
  // Narrows `never` so TypeScript understands we already threw
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

  /* 1️⃣ read current state (one round-trip) */
  const { data: current, error: readError } = await supabase
    .from("todos")
    .select("checked")
    .eq("id", id)
    .single();

  assert(readError);

  /* 2️⃣ write back the negated value, returning the full row */
  const { data, error } = await supabase
    .from("todos")
    .select("checked")
    .eq("id", id)
    .single<{ checked: boolean }>();

  assert(error);
  return data;
};
