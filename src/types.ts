export interface Todo {
  id: number; // or string if you keep Postgres bigints as text
  task: string;
  checked: boolean;
}

/** Kept for compatibility, but you can remove it if unused */
export interface Id {
  id: number;
}

export interface ServerFeedback {
  type: string;
  message: string;
}
