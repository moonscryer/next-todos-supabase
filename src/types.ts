import { RowDataPacket } from "mysql2";

export interface Todo extends RowDataPacket {
  id: number;
  task: string;
  checked: boolean;
}

export interface Id extends RowDataPacket {
  id: number;
}

export interface ServerFeedback {
  type: string;
  message: string;
}
