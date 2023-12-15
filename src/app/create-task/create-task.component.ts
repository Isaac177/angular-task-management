import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Tasks} from "../task/task.model";
import {NgForOf, NgIf} from "@angular/common";
import {TaskService} from "../task/task.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent {
  @Input() showCreateTask: boolean = false;
  @Output() closeCreateTaskEvent = new EventEmitter<void>();
  @Output() createTaskEvent = new EventEmitter<Tasks>();


  newTask: Tasks = {
    id: 0,
    title: '',
    description: '',
    completed: false,
    dueDate: undefined as any,
    priority: '',
    category: '',
    assignedTo: '',
    createdDate: new Date(),
    lastUpdated: undefined as any,
    progress: 0,
    effort: 0,
    status: 'Not Started'
  }

  constructor(private taskService: TaskService) {

  }
  closeCreateTask() {
    this.showCreateTask = false;
    this.closeCreateTaskEvent.emit();
  }

  submitTask() {
    this.createTaskEvent.emit(this.newTask);
    this.newTask = {
      ...this.newTask, title: '', description: '', dueDate: undefined as any, priority: '', category: '', assignedTo: '', createdDate: new Date(), lastUpdated: undefined as any, progress: 0, effort: 0, status: 'Not Started'
    }
    this.closeCreateTask();
  }

}
