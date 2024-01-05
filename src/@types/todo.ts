export interface AddTodoForm {
  todo_id?: number;
  content: string;
  level: number;
  project_id: number | null;
  repeat_day: string;
  repeat_end_date: string | null;
}

export interface Todo extends AddTodoForm {
  todo_id: number;
  check: boolean;
  date: string;
  index: number;
}
