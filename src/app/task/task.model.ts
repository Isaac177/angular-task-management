export interface  Tasks {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: Date;
  priority: string;
  category: string;
  assignedTo: string;
  createdDate: Date;
  lastUpdated: Date;
  progress: number;
  effort: number;
  status: string;
}

