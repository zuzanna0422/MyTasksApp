import { Component, EventEmitter, inject, Input, Output, viewChild } from "@angular/core";
import { FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from "@angular/forms";
import { Task, TaskStatus } from "../task.model";
import { TaskService } from "../task.service";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-task',
    imports: [FormsModule, CommonModule, ReactiveFormsModule, MatIconModule],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})

export class TaskComponent {
    private taskService = inject(TaskService);
    @Output() taskAdded = new EventEmitter<Task>();
    @Output() taskCancelled = new EventEmitter<void>();
    private form = viewChild<NgForm>('form');
    
    get categories() {
        return this.taskService.categories;
    }


    onSubmit(formData: NgForm) {
        if(formData.form.invalid){
            return;
        }
        const enteredTitle = formData.form.value.title?.trim();
        const enteredDescription = formData.form.value.description?.trim();
        const selectedCategory = formData.form.value.categories;

        console.log('Entered Title:', enteredTitle);
        console.log('Entered Description:', enteredDescription);
    

        const newTask: Task = {
            title: enteredTitle,
            description: enteredDescription,
            category: selectedCategory,
            status: 'TO-DO',
            date: new Date(),
        }
        console.log('New Task:', newTask);
        this.taskService.addTask(newTask);

        this.taskAdded.emit(newTask);
        formData.resetForm();
    }
    onCancel() {
        this.taskCancelled.emit();
        this.form()?.resetForm();
    }
    onAddCategory() {
        const newCategory = this.form()?.value.newCategory?.trim() || '';
        
        if (newCategory) {
            this.taskService.addCategory(newCategory);
            if (this.form()?.controls['newCategory']) {
                this.form()?.controls['newCategory'].reset();
            }
        }
    }

    onDeleteCategory(category: string) {
        this.taskService.deleteCategory(category);
    }
}