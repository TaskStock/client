export interface Project {
  project_id: number;
  name: string;
  ispublic: publicType;
  user_id: number;
  todo_count: number;
  retrospect_count: number;
}

export type publicType = "all" | "followers" | "hidden";

export interface ProjectForm {
  project_id?: number;
  name: string;
  ispublic: publicType;
  progress: "complete" | "inProgress";
}
