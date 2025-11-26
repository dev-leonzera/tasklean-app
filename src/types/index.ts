export type ViewType = "dashboard" | "projects" | "tasks" | "sprints" | "commitments" | "reports" | "settings";

export interface Project {
  id: number;
  name: string;
  desc: string;
  progress: number;
  tasks: number;
  completed: number;
  status: string;
  members: string[];
  due: string;
  color: string;
}

export interface Task {
  id: number;
  name: string;
  project: string;
  assignee: string;
  status: string;
  priority: string;
  due: string;
  comments: number;
  attachments: number;
  description?: string;
}

export interface Sprint {
  id: number;
  name: string;
  status: string;
  startDate: string;
  endDate: string;
  progress: number;
  tasks: { total: number; completed: number };
  team: string[];
}

export interface Commitment {
  id: number;
  title: string;
  description?: string;
  date: string; // Data no formato YYYY-MM-DD
  startTime: string; // Hora de início no formato HH:mm
  endTime: string; // Hora de término no formato HH:mm
  location?: string;
  participants: string[];
  project?: string;
  status: "scheduled" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  reminder?: string; // Ex: "15min", "1h", "1day"
}

