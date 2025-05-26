import { RowDataPacket } from "mysql2";

export interface Todo {
  id: number;
  task: string;
  checked: boolean;
}

export interface Id extends RowDataPacket {
  id: number;
}
