export type ViewType = "dashboard" | "projects" | "tasks" | "sprints" | "reports" | "settings";

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

