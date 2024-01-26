import { DateString, IsoString } from "./calendar";

export interface Retrospect {
  retrospect_id: number;
  content: string;
  created_date: IsoString;
  project_id: number;
  user_id: number;
}

export interface RetrospectForm {
  retrospect_id?: number;
  content: string;
  project_id: number | null;
  date: DateString;
}
