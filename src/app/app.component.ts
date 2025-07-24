import { Component, signal } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { TaskListComponent } from "./tasks/task-list/task-list.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, TaskListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
