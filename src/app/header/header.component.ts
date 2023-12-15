import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {TaskService} from "../task/task.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title = '🚀 Task Manager';
  isInputFocused: boolean = false;
  searchTerm: string = '';

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
}
