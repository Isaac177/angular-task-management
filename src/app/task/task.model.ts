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
  comments: Comment[];
  status: string;
}

export interface Comment {
  author: string;
  message: string;
  date: Date;
}
