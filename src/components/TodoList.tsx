import { getAllTodos } from "@/queries";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import {
  createTodo,
  removeTodo,
  saveTodo,
  toggleTodo,
} from "@/lib/server-actions";
import { SubmitButton } from "./SubmitButton";
import { SubmitCheckbox } from "./SubmitCheckbox";

export default async function TodoList() {
  const todos = await getAllTodos();

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Todo list</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* --------------------------- Add new todo -------------------------- */}
        <form action={createTodo} className="flex gap-2">
          <Input
            name="task"
            placeholder="What needs to be done?"
            className="flex-1"
            autoComplete="off"
          />
          <SubmitButton>Add</SubmitButton>
        </form>

        {/* --------------------------- Existing todos ------------------------ */}
        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center gap-3 rounded-lg border p-3"
            >
              {/* ✅ Checkbox toggles checked server-side */}
              <form action={toggleTodo(todo.id)}>
                <button type="submit" className="rounded">
                  <SubmitCheckbox checked={todo.checked} />
                </button>
              </form>

              {/* Edit task ----------------------------------------------------- */}
              <form
                action={saveTodo(todo.id)}
                className="flex flex-1 items-center gap-2"
              >
                <Input
                  name="task"
                  defaultValue={todo.task}
                  className={`flex-1 bg-transparent ${
                    todo.checked ? "line-through opacity-60" : ""
                  }`}
                  autoComplete="off"
                />
                <SubmitButton variant="secondary" size="sm">
                  Save
                </SubmitButton>
              </form>

              {/* Delete -------------------------------------------------------- */}
              <form action={removeTodo(todo.id)}>
                <SubmitButton
                  variant="destructive"
                  size="icon"
                  ariaLabel="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </SubmitButton>
              </form>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
