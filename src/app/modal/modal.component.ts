import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {Tasks} from "../task/task.model";
import {FormsModule} from "@angular/forms";
import {TaskService} from "../task/task.service";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf,
    DatePipe
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input() task: Tasks | null = null;
  @Output() closeModalEvent = new EventEmitter<void>();
  @Output() updateTaskEvent = new EventEmitter<Tasks>();

  statuses: string[] = [];
  priorities: string[] = [];
  efforts: number[] = [];

  constructor(private taskService: TaskService) {
    this.statuses = this.taskService.getStatuses();
    this.priorities = this.taskService.getPriorities();
    this.efforts = this.taskService.getEfforts();
  }

  onDueDateChange(newDateString: string) {
    if (this.task) {
      this.task.dueDate = new Date(newDateString);
    }
  }

  onStatusChange(newStatus: string) {
    if (this.task) {
      this.task.status = newStatus;
    }
  }

  onPriorityChange(newPriority: string) {
    if (this.task) {
      this.task.priority = newPriority;
    }
  }

  onEffortChange(newEffort: number) {
    if (this.task) {
      this.task.effort = newEffort;
    }
  }

  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit();
  }

  saveChanges() {
    if (this.task) {
      this.task.completed = this.task.status === 'Completed';
      this.updateTaskEvent.emit(this.task);

      this.closeModal();
    }
  }
}
