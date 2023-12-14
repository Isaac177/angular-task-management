import { Injectable } from '@angular/core';
import { Tasks } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: Tasks[] = [
    {
      id: 1,
      title: 'Implement Authentication Module',
      description: 'Develop and integrate the user authentication module using JWT.',
      completed: false,
      dueDate: new Date('2023-12-20'),
      priority: 'High',
      category: 'Development',
      assignedTo: 'Alice',
      createdDate: new Date('2023-11-01'),
      lastUpdated: new Date('2023-11-05'),
      progress: 50,
      effort: 15,
      comments: [
        { author: 'Bob', message: 'Ensure to include refresh token logic.', date: new Date('2023-11-06') }
      ],
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Quarterly Financial Report Preparation',
      description: 'Prepare the Q4 financial report for the accounting department.',
      completed: false,
      dueDate: new Date('2023-12-10'),
      priority: 'Medium',
      category: 'Finance',
      assignedTo: 'Charles',
      createdDate: new Date('2023-10-20'),
      lastUpdated: new Date('2023-11-02'),
      progress: 30,
      effort: 20,
      comments: [
        { author: 'Alice', message: 'Check the latest transaction records for accuracy.', date: new Date('2023-11-03') }
      ],
      status: 'Not Started'
    },
    {
      id: 3,
      title: 'Update Company Website',
      description: 'Redesign the homepage and update the product section.',
      completed: true,
      dueDate: new Date('2023-10-15'),
      priority: 'Low',
      category: 'Marketing',
      assignedTo: 'Dave',
      createdDate: new Date('2023-09-01'),
      lastUpdated: new Date('2023-10-01'),
      progress: 100,
      effort: 10,
      comments: [
        { author: 'Eve', message: 'Make sure the mobile responsiveness is tested.', date: new Date('2023-09-15') }
      ],
      status: 'Completed'
    },
    {
      id: 4,
      title: 'Organize Team Building Event',
      description: 'Plan and organize a team building event for the software development department.',
      completed: false,
      dueDate: new Date('2023-11-30'),
      priority: 'Medium',
      category: 'HR',
      assignedTo: 'Fiona',
      createdDate: new Date('2023-10-05'),
      lastUpdated: new Date('2023-10-10'),
      progress: 40,
      effort: 5,
      comments: [
        { author: 'George', message: 'Confirm the list of activities and the budget.', date: new Date('2023-10-12') }
      ],
      status: 'In Progress'
    },

    {
      id: 5,
      title: 'Conduct User Experience Research',
      description: 'Perform a detailed analysis of user interaction with our new app feature.',
      completed: false,
      dueDate: new Date('2023-11-25'),
      priority: 'High',
      category: 'Research',
      assignedTo: 'Hannah',
      createdDate: new Date('2023-10-15'),
      lastUpdated: new Date('2023-10-18'),
      progress: 20,
      effort: 12,
      comments: [
        { author: 'Ivan', message: 'Include feedback from the beta testing phase.', date: new Date('2023-10-19') }
      ],
      status: 'Not Started'
    },
    {
      id: 6,
      title: 'Server Maintenance and Upgrade',
      description: 'Perform routine maintenance and updates on the primary server.',
      completed: false,
      dueDate: new Date('2023-12-05'),
      priority: 'High',
      category: 'IT',
      assignedTo: 'Jack',
      createdDate: new Date('2023-11-10'),
      lastUpdated: new Date('2023-11-12'),
      progress: 0,
      effort: 8,
      comments: [
        { author: 'Alice', message: 'Ensure minimal downtime during upgrades.', date: new Date('2023-11-13') }
      ],
      status: 'Scheduled'
    },
    {
      id: 7,
      title: 'Develop Marketing Campaign for New Product',
      description: 'Create a comprehensive marketing strategy for the upcoming product launch.',
      completed: false,
      dueDate: new Date('2023-12-30'),
      priority: 'Medium',
      category: 'Marketing',
      assignedTo: 'Karen',
      createdDate: new Date('2023-11-05'),
      lastUpdated: new Date('2023-11-08'),
      progress: 10,
      effort: 20,
      comments: [
        { author: 'Dave', message: 'Review the target demographics and align the campaign accordingly.', date: new Date('2023-11-09') }
      ],
      status: 'Planning'
    },
    {
      id: 8,
      title: 'Data Migration for Client A',
      description: 'Migrate legacy data to the new system for Client A.',
      completed: false,
      dueDate: new Date('2023-11-20'),
      priority: 'High',
      category: 'Client Project',
      assignedTo: 'Liam',
      createdDate: new Date('2023-10-22'),
      lastUpdated: new Date('2023-10-25'),
      progress: 40,
      effort: 15,
      comments: [
        { author: 'Charles', message: 'Check data integrity post-migration.', date: new Date('2023-10-26') }
      ],
      status: 'In Progress'
    },
    {
      id: 9,
      title: 'Internal Training Session on Cybersecurity',
      description: 'Organize a training session on cybersecurity best practices for all employees.',
      completed: false,
      dueDate: new Date('2023-11-15'),
      priority: 'Low',
      category: 'HR',
      assignedTo: 'Mia',
      createdDate: new Date('2023-10-05'),
      lastUpdated: new Date('2023-10-12'),
      progress: 70,
      effort: 5,
      comments: [
        { author: 'Fiona', message: 'Include recent case studies in the training.', date: new Date('2023-10-13') }
      ],
      status: 'Preparing'
    },
    {
      id: 10,
      title: 'Optimize Database Queries',
      description: 'Review and optimize existing database queries for performance improvements.',
      completed: true,
      dueDate: new Date('2023-10-30'),
      priority: 'Medium',
      category: 'Development',
      assignedTo: 'Noah',
      createdDate: new Date('2023-09-20'),
      lastUpdated: new Date('2023-10-01'),
      progress: 100,
      effort: 10,
      comments: [
        { author: 'Jack', message: 'Check the execution plans for complex queries.', date: new Date('2023-09-25') }
      ],
      status: 'Completed'
    }

  ];

  updateTask(updatedTask: Tasks) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
    }
  }

  constructor() { }

  getTasks(): Tasks[] {
    return this.tasks;
  }

  getStatuses(): string[] {
    const statuses = new Set(this.tasks.map(task => task.status));
    return Array.from(statuses);
  }
}
