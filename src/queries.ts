import { OkPacket } from "mysql2";
import { connect } from "./connect";
import { Id, Todo } from "./types";

export const getAllTodos = async (): Promise<Todo[]> => {
  const connection = await connect();
  const [rows] = await connection.query<Todo[]>(
    "SELECT id, task, checked FROM todos ORDER BY id ASC"
  );
  return rows.map((row) => ({
    ...row,
    checked: Boolean(row.checked),
  }));
};

export const addTodo = async (task: string): Promise<Todo> => {
  try {
    const connection = await connect();

    const [result] = await connection.execute<OkPacket>(
      "INSERT INTO todos (task) VALUES (?)",
      [task]
    );

    const insertId = result.insertId;

    const [rows] = await connection.query<Todo[]>(
      "SELECT id, task, checked FROM todos WHERE id = ?",
      [insertId]
    );
    const todo = rows[0];
    return {
      ...todo,
      checked: Boolean(todo.checked),
    };
  } catch (e) {
    throw e;
  }
};

export const updateTodo = async (id: number, task: string): Promise<Todo> => {
  try {
    const connection = await connect();

    await connection.execute("UPDATE todos SET task = ? WHERE id = ?", [
      task,
      id,
    ]);

    const [rows] = await connection.query<Id[]>(
      "SELECT id, task, checked FROM todos WHERE id = ?",
      [id]
    );

    return rows[0] as Todo;
  } catch (e) {
    throw e;
  }
};

export const deleteTodo = async (id: number): Promise<Todo> => {
  try {
    const connection = await connect();

    const [rows] = await connection.query<Id[]>(
      "SELECT id, task, checked FROM todos WHERE id = ?",
      [id]
    );

    const todo = rows[0] as Todo;

    await connection.execute("DELETE FROM todos WHERE id = ?", [id]);

    return todo;
  } catch (e) {
    throw e;
  }
};

export const checkTodo = async (id: number): Promise<Todo> => {
  try {
    const connection = await connect();

    await connection.execute(
      "UPDATE todos SET checked = NOT checked WHERE id = ?",
      [id]
    );

    const [rows] = await connection.query<Id[]>(
      "SELECT id, task, checked FROM todos WHERE id = ?",
      [id]
    );

    return rows[0] as Todo;
  } catch (e) {
    throw e;
  }
};
