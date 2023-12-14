import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {Tasks} from "../task/task.model";
import {FormsModule} from "@angular/forms";
import {TaskService} from "../task/task.service";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf
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

  constructor(private taskService: TaskService) {
    this.statuses = this.taskService.getStatuses();
  }

  closeModal() {
    this.showModal = false;
    this.closeModalEvent.emit();
  }

  saveChanges() {
    if (this.task) {
      //this.task.completed = this.task.status === 'completed';
      const updatedTask = {...this.task, completed: this.task.status === 'completed'};
      this.updateTaskEvent.emit(this.task);
      this.closeModal();
    }
  }
}
