import { OkPacket } from "mysql2";
import { connect } from "./connect";
import { Id, Todo } from "./types";

export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const connection = await connect();
    const [todos] = await connection.query<Id[]>(
      "SELECT id, task, checked FROM todos"
    );
    return todos.map((todo) => ({
      id: todo.id,
      task: todo.task,
      checked: todo.checked,
    }));
  } catch (e) {
    throw e;
  }
};

export const getTodo = async (id: number): Promise<Todo> => {
  try {
    const connection = await connect();
    const [todo] = await connection.query<Id[]>(
      "SELECT id, task, checked FROM todos WHERE id = ?",
      [id]
    );
    return todo.map((todo) => ({
      id: todo.id,
      task: todo.task,
      checked: todo.checked,
    }))[0];
  } catch (e) {
    throw e;
  }
};

export const addTodo = async (task: string): Promise<Todo> => {
  try {
    const connection = await connect();

    const [result] = await connection.execute<OkPacket[]>(
      "INSERT INTO todos (task) VALUES (?)",
      [task]
    );

    // @ts-expect-error: result is OkPacket but insertId is valid
    const insertId = result.insertId;

    const [rows] = await connection.query<Id[]>(
      "SELECT id, task, checked FROM todos WHERE id = ?",
      [insertId]
    );

    return rows[0] as Todo;
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
