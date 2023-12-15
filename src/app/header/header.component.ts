import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TaskService} from "../task/task.service";
import {CreateTaskComponent} from "../create-task/create-task.component";
import {NgIf} from "@angular/common";
import {Tasks} from "../task/task.model";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    CreateTaskComponent,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = '🚀 Task Manager';
  isInputFocused: boolean = false;
  searchTerm: string = '';
  showCreateTask: boolean = false;

  constructor(private taskService: TaskService) {
  }

  onSearchTermChange() {
    this.taskService.setSearchTerm(this.searchTerm);
    console.log('searchTerm: ', this.searchTerm);
  }

  onFocus() {
    this.isInputFocused = true;
  }

  onBlur() {
    this.isInputFocused = false;
  }

  openCreateTask() {
    this.showCreateTask = true;
  }

  closeCreateTask() {
    this.showCreateTask = false;
  }

  onCreateTask(newTask: Tasks) {
    const newId = this.taskService.generateNewTaskId();
    const taskToCreate = {...newTask, id: newId, lastUpdated: new Date()};

    this.taskService.addTask(taskToCreate);
    this.showCreateTask = false;
  }
}
