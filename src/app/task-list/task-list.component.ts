import { Component } from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {Tasks} from "../task/task.model";
import {TaskService} from "../task/task.service";
import {OutlineIconsModule} from "@dimaslz/ng-heroicons";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgClass,
    OutlineIconsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Tasks[] | undefined;
  today: Date = new Date();

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  openTaskDetails(task: Tasks) {
    console.log('Task details for ' + task.title + ' clicked.');
  }
}
