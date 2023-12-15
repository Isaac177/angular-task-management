import { Injectable } from '@angular/core';
import { Tasks } from './task.model';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Tasks[] = [
    {
      id: 1,
      title: 'Implement Authentication Module',
      description: 'Develop and integrate the user authentication module using JWT. Ensure to include refresh token logic. You can use any third-party library for this.',
      completed: false,
      dueDate: new Date('2023-12-20'),
      priority: 'High',
      category: 'Development',
      assignedTo: 'Alice',
      createdDate: new Date('2023-11-01'),
      lastUpdated: new Date('2023-11-05'),
      progress: 50,
      effort: 15,
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Quarterly Financial Report Preparation',
      description: 'Prepare the Q4 financial report for the accounting department. Ensure to include the latest transaction records. You can use any third-party library for this.',
      completed: false,
      dueDate: new Date('2023-12-10'),
      priority: 'Medium',
      category: 'Finance',
      assignedTo: 'Charles',
      createdDate: new Date('2023-10-20'),
      lastUpdated: new Date('2023-11-02'),
      progress: 30,
      effort: 20,
      status: 'Not Started'
    },
    {
      id: 3,
      title: 'Update Company Website',
      description: 'Redesign the homepage and update the product section. You can use any third-party library for this.',
      completed: true,
      dueDate: new Date('2023-10-15'),
      priority: 'Low',
      category: 'Marketing',
      assignedTo: 'Dave',
      createdDate: new Date('2023-09-01'),
      lastUpdated: new Date('2023-10-01'),
      progress: 100,
      effort: 10,
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Organize Team Building Event',
      description: 'Plan and organize a team building event for the software development department. You can use any third-party library for this.',
      completed: false,
      dueDate: new Date('2023-11-30'),
      priority: 'Medium',
      category: 'HR',
      assignedTo: 'Fiona',
      createdDate: new Date('2023-10-05'),
      lastUpdated: new Date('2023-10-10'),
      progress: 40,
      effort: 5,
      status: 'In Progress'
    },

    {
      id: 5,
      title: 'Conduct User Experience Research',
      description: 'Perform a detailed analysis of user interaction with our new app feature. Try to find out the pain points and the opportunities for improvement. You can use any third-party library for this.',
      completed: false,
      dueDate: new Date('2023-11-25'),
      priority: 'High',
      category: 'Research',
      assignedTo: 'Hannah',
      createdDate: new Date('2023-10-15'),
      lastUpdated: new Date('2023-10-18'),
      progress: 20,
      effort: 12,
      status: 'Not Started'
    },
    {
      id: 6,
      title: 'Server Maintenance and Upgrade',
      description: 'Perform routine maintenance and updates on the primary server. Make sure the system is stable and performant. You can use any third-party library for this.',
      completed: false,
      dueDate: new Date('2023-12-05'),
      priority: 'High',
      category: 'IT',
      assignedTo: 'Jack',
      createdDate: new Date('2023-11-10'),
      lastUpdated: new Date('2023-11-12'),
      progress: 0,
      effort: 8,
      status: 'Scheduled'
    },
    {
      id: 7,
      title: 'Develop Marketing Campaign for New Product',
      description: 'Create a comprehensive marketing strategy for the upcoming product launch. Like to include the target demographics and the campaign budget. You can use any third-party library for this.',
      completed: false,
      dueDate: new Date('2023-12-30'),
      priority: 'Medium',
      category: 'Marketing',
      assignedTo: 'Karen',
      createdDate: new Date('2023-11-05'),
      lastUpdated: new Date('2023-11-08'),
      progress: 10,
      effort: 20,
      status: 'Planning'
    },
    {
      id: 8,
      title: 'Data Migration for Client A',
      description: 'Migrate legacy data to the new system for Client A. Be sure to include the data integrity checks post-migration. You can use any third-party library for this.',
      completed: false,
      dueDate: new Date('2023-11-20'),
      priority: 'High',
      category: 'Client Project',
      assignedTo: 'Liam',
      createdDate: new Date('2023-10-22'),
      lastUpdated: new Date('2023-10-25'),
      progress: 40,
      effort: 15,
      status: 'In Progress'
    },
    {
      id: 9,
      title: 'Internal Training Session on Cybersecurity',
      description: 'Organize a training session on cybersecurity best practices for all employees. Make sure to include recent case studies. You can use any third-party library for this.',
      completed: false,
      dueDate: new Date('2023-11-15'),
      priority: 'Low',
      category: 'HR',
      assignedTo: 'Mia',
      createdDate: new Date('2023-10-05'),
      lastUpdated: new Date('2023-10-12'),
      progress: 70,
      effort: 5,
      status: 'Preparing'
    },
    {
      id: 10,
      title: 'Optimize Database Queries',
      description: 'Review and optimize existing database queries for performance improvements. You can use any third-party library for this.',
      completed: true,
      dueDate: new Date('2023-10-30'),
      priority: 'Medium',
      category: 'Development',
      assignedTo: 'Noah',
      createdDate: new Date('2023-09-20'),
      lastUpdated: new Date('2023-10-01'),
      progress: 100,
      effort: 10,
      status: 'Completed'
    }

  ];
  isCompleted(task: Tasks): boolean {
    return task.status === 'Completed';
  };


  constructor() { }

  today: Date = new Date(new Date().setHours(0, 0, 0, 0));

  private searchTerms = new BehaviorSubject<string>('');
  private tasksSubject = new BehaviorSubject<Tasks[]>(this.tasks);

  isPastDue(dueDate: Date | string): boolean {
    if (!(dueDate instanceof Date)) {
      dueDate = new Date(dueDate);
    }
    const normalizedDueDate = new Date(dueDate.setHours(0, 0, 0, 0));
    return normalizedDueDate < this.today;
  }

  getStatuses(): string[] {
    const statuses = new Set(this.tasks.map(task => task.status));
    return Array.from(statuses);
  }

  getPriorities(): string[] {
    const priorities = new Set(this.tasks.map(task => task.priority));
      return Array.from(priorities);
  }

  getEfforts(): number[] {
    const efforts = new Set(this.tasks.map(task => task.effort));
    return Array.from(efforts);
  }

  getAssignees() {
    const assignees = new Set(this.tasks.map(task => task.assignedTo));
    return Array.from(assignees);
  }

  deleteTask(taskId: number) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index > -1) {
      this.tasks.splice(index, 1);
      this.tasksSubject.next(this.tasks);
    }
  }

  getCategories() {
    const categories = new Set(this.tasks.map(task => task.category));
    return Array.from(categories);
  }

  setSearchTerm(term: string) {
    this.searchTerms.next(term);
  }

  getTasksObservable(): Observable<Tasks[]> {
    return this.tasksSubject.asObservable();
  }

  getSearchTermObservable(): Observable<string> {
    return this.searchTerms.asObservable();
  }

  generateNewTaskId(): number {
    return this.tasks.length > 0
    ? Math.max(...this.tasks.map(task => task.id)) + 1
      : 1;
  }

  addTask(newTask: Tasks) {
    this.tasks.push(newTask);
    this.tasksSubject.next(this.tasks);
  }

}
