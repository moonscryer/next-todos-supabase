import { RowDataPacket } from "mysql2";

export interface Todo {
  id: number;
  task: string;
  checked: string;
}

export interface Id extends RowDataPacket {
  id: number;
}

export interface ServerFeedback {
  type: string;
  message: string;
}
