import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tasks} from "../task/task.model";
import {DatePipe, NgForOf, NgIf, NgClass} from "@angular/common";
import {ModalComponent} from "../modal/modal.component";
import {TaskService} from "../task/task.service";

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [
    DatePipe,
    ModalComponent,
    NgForOf,
    NgIf,
    NgClass
  ],
  templateUrl: './task-detail.component.html',
  styleUrl: './task-detail.component.css'
})
export class TaskDetailComponent {
  @Input() task: Tasks | null = null;
  @Input() today!: Date;
  @Output() closeTaskDetailsEvent = new EventEmitter<void>();
  @Input() showTaskDetails!: boolean;
  @Input() isPastDue!: boolean;

  constructor(private taskService: TaskService) {
  }

  isTaskPastDue(dueDate: Date): boolean {
    return this.task ? this.taskService.isPastDue(this.task.dueDate) : false;
  }
  closeTaskDetail() {
    this.showTaskDetails = false;
    this.closeTaskDetailsEvent.emit();
  }

}
