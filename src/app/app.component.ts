import { Component, OnInit, signal } from '@angular/core';
import { HeaderComponent } from "./header/header.component";
import { TaskListComponent } from "./tasks/task-list/task-list.component";
import { CommonModule } from '@angular/common';
import { ThemeService } from './theme.service';

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, TaskListComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    constructor(private theme: ThemeService) {}
    ngOnInit() {
    this.theme.init();
  }

}
