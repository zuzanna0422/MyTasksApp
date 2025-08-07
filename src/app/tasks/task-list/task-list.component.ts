import { Component, inject } from "@angular/core";
import { TaskService } from "../task.service";
import { CommonModule, DatePipe } from "@angular/common";
import { Task } from "../task.model";
import { CategoriesComponent } from "../categories/categories.component";
import { TaskComponent } from "../task/task.component";
import { EditComponent } from "../edit/edit.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTab } from "@angular/material/tabs";
import { MatTableModule } from "@angular/material/table";

@Component({
    selector: 'app-task-list',
    imports: [
      DatePipe, 
      CategoriesComponent, 
      TaskComponent, 
      CommonModule, 
      EditComponent, 
      MatCheckboxModule,
      MatButtonModule,
      MatTableModule,
    MatIconModule],
    templateUrl: './task-list.component.html',
    styleUrl: './task-list.component.scss'
})

export class TaskListComponent {
    private taskService = inject(TaskService);
    selectedCategory: string = 'all';
    isAddingTask = false;
    isEditTask = false;
    currentTask!: Task;
    
    get tasks() {
        return this.taskService.allTask;
    }

    onSelectedCategory(category: string) {
        this.selectedCategory = category;
    }

    get TODOTasks() {
        return this.taskService.getFilteredTask(this.selectedCategory).filter(task => task.status === 'TO-DO');
    }

    get DONETasks() {
        return this.taskService.getFilteredTask(this.selectedCategory).filter(task => task.status === 'DONE');
    }

    onDelete(task: Task) {
        this.taskService.deleteTask(task);
    }

    onDone(task: Task) {
        this.taskService.markAsDoneTask(task);
    }
  onStartAddingTask() {
    this.isAddingTask = true;
  }
  onStopAddingTask() {
    this.isEditTask = false;
    //this.currentTask = undefined;
    this.isAddingTask = false;
  }

  onEdit(task: Task) {
    this.isEditTask = true;
    this.currentTask = task;
  }

}