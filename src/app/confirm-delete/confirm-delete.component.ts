import {Component, EventEmitter, Input, numberAttribute, Output} from '@angular/core';
import {NgIf} from "@angular/common";


@Component({
  selector: 'app-confirm-delete',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './confirm-delete.component.html',
  styleUrl: './confirm-delete.component.css'
})
export class ConfirmDeleteComponent {
  @Input({transform: numberAttribute}) taskId!: number;
  @Input() showConfirmDelete!: boolean;
  @Output() closeConfirmDeleteEvent = new EventEmitter<void>();
  @Output() confirmDeleteEvent = new EventEmitter<number>();

  closeConfirmDelete() {
    this.showConfirmDelete = false;
    this.closeConfirmDeleteEvent.emit();
  }

  confirmDelete() {
    this.confirmDeleteEvent.emit(this.taskId);
  }

}
