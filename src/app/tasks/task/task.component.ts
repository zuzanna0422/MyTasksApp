import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Task, TaskStatus } from "../task.model";
import { TaskService } from "../task.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: 'app-task',
    imports: [FormsModule, CommonModule],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})

export class TaskComponent {
    private taskService = inject(TaskService);
    @Output() taskAdded = new EventEmitter<Task>();
    @Output() taskCancelled = new EventEmitter<void>();
    categories = this.taskService.categories;

    enteredTitle = '';
    enteredDescription = '';
    Status: TaskStatus = 'TO-DO';
    selectedCategory = '';
    newCategory = '';


    onSubmit() {
        const newTask: Task = {
            title: this.enteredTitle,
            description: this.enteredDescription,
            category: this.selectedCategory,
            status: 'TO-DO',
            date: new Date(),
        }

        this.taskService.addTask(newTask);

        this.enteredTitle = '';
        this.enteredDescription = '';
    }
    onCancel() {
        this.taskCancelled.emit();
        this.enteredTitle = '';
        this.enteredDescription = '';
    }
    onSave() {
        this.onSubmit();
        this.taskAdded.emit();
    }
    onAddCategory() {
        this.newCategory = this.newCategory.trim();
        this.taskService.addCategory(this.newCategory);
        this.newCategory = '';
    }
}