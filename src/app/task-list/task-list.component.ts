import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {Tasks} from "../task/task.model";
import {TaskService} from "../task/task.service";
import {OutlineIconsModule} from "@dimaslz/ng-heroicons";
import {ModalComponent} from "../modal/modal.component";
import {TaskDetailComponent} from "../task-detail/task-detail.component";
import {ConfirmDeleteComponent} from "../confirm-delete/confirm-delete.component";
import {Subscription} from "rxjs";

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
    NgIf,
    ConfirmDeleteComponent
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() isPastDue!: boolean;
  @Input() today!: Date;
  @Input() isCompleted!: boolean;

  tasks: Tasks[];
  showModal: boolean = false;
  showTaskDetails: boolean = false;
  selectedTask: Tasks | null = null;
  showConfirmDelete: boolean = false;
  selectedTaskForDeletion: number | null = null;
  searchTerm: string = '';
  filteredTasks: Tasks[] = [];

  private taskSubscription!: Subscription;

  constructor(private taskService: TaskService) {
    this.tasks = [];
  }

  ngOnInit() {
    this.taskSubscription = this.taskService.getTasksObservable().subscribe((updatedTasks: Tasks[]) => {
      this.tasks = updatedTasks;
      this.filterTasks(this.searchTerm);
    });

    this.taskService.getSearchTermObservable().subscribe((searchTerm: string) => {
      this.searchTerm = searchTerm;
      this.filterTasks(this.searchTerm);
    });
  }

  ngOnDestroy() {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
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

  isTaskCompleted(task: Tasks): boolean {
    return this.taskService.isCompleted(task);
  }

  markTaskAsCompleted(event: MouseEvent, task: Tasks) {
    event.stopPropagation();
    task.status = 'Completed';
  }

  openConfirmDelete(task: Tasks | null, event: MouseEvent) {
    event.stopPropagation();
    console.log('openConfirmDelete');
    console.log('openConfirmDelete', task);

    if (task !== null) {
      console.log('task.id', task.id);
      this.selectedTaskForDeletion = task.id;
      this.showConfirmDelete = true;
      this.showModal = false;
    }
  }

  closeConfirmDelete() {
    this.showConfirmDelete = false;
  }

  deleteTaskById(taskId: number) {
    this.taskService.deleteTask(taskId);
  }

  onConfirmDelete(taskId: number) {
    this.deleteTaskById(taskId);
    this.closeConfirmDelete();
  }

  filterTasks(searchTerm: string) {
    if (searchTerm) {
      this.filteredTasks = this.tasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      this.filteredTasks = this.tasks;
    }
  }


  updateTask(updatedTask: Tasks) {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index > -1) {
      this.tasks[index] = updatedTask;
      this.showModal = false;
    }
  }

}
