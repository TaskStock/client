import { IsoString } from "./calendar";

export interface AddTodoForm {
  todo_id: number | null;
  content: string;
  level: number;
  original_level?: number;

  // 이건 아마 editTodo 관련
  todo_date?: IsoString;
  // checked 는 editTodo 관련해서 필요함.
  checked?: boolean;

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
