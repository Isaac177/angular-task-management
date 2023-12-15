import {Component, Input} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Tasks} from "../task/task.model";
import {TaskService} from "../task/task.service";
import {OutlineIconsModule} from "@dimaslz/ng-heroicons";
import {ModalComponent} from "../modal/modal.component";
import {TaskDetailComponent} from "../task-detail/task-detail.component";

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe,
    NgClass,
    OutlineIconsModule,
    ModalComponent,
    TaskDetailComponent,
    NgIf
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() isPastDue!: boolean;
  @Input() today!: Date;
  tasks: Tasks[];
  showModal: boolean = false;
  showTaskDetails: boolean = false;
  selectedTask: Tasks | null = null;

  constructor(private taskService: TaskService) {
    this.tasks = [];
  }

  ngOnInit() {
    this.tasks = this.taskService.getTasks();
  }

  openModal(event: MouseEvent, task: Tasks) {
    event.stopPropagation();
    this.selectedTask = JSON.parse(JSON.stringify(task));
    this.showModal = true;
    this.showTaskDetails = false;
  }

  closeModal() {
    this.showModal = false;
  }

  openTaskDetails(task: Tasks) {
    this.selectedTask = JSON.parse(JSON.stringify(task));
    this.showTaskDetails = true;
    this.showModal = false;
  }

  closeTaskDetails() {
    this.showTaskDetails = false;
  }

  isTaskPastDue(dueDate: Date): boolean {
    return this.taskService.isPastDue(dueDate);
  }

  updateTask(updatedTask: Tasks) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
      this.showModal = false;
    }
  }

}
