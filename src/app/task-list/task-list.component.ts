import { Component } from '@angular/core';
import {DatePipe, NgClass, NgForOf} from "@angular/common";
import {Tasks} from "../task/task.model";
import {TaskService} from "../task/task.service";
import {OutlineIconsModule} from "@dimaslz/ng-heroicons";
import {ModalComponent} from "../modal/modal.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgClass,
    OutlineIconsModule,
    ModalComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Tasks[];
  today: Date = new Date();
  showModal: boolean = false;
  selectedTask: Tasks | null = null;

  constructor(private taskService: TaskService) {
    this.tasks = [];
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  openModal(task: Tasks) {
    this.selectedTask = JSON.parse(JSON.stringify(task));
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openTaskDetails(task: Tasks) {
    console.log(task);
  }

  updateTask(updatedTask: Tasks) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
    }
    this.showModal = false;
  }
}
