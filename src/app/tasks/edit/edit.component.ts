import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { TaskService } from "../task.service";
import { Task, TaskStatus } from "../task.model";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'app-edit',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './edit.component.html',
    styleUrl: './edit.component.scss'
})

export class EditComponent {
    private taskService = inject(TaskService);
    @Output() taskAdded = new EventEmitter<Task>();
    @Output() taskCancelled = new EventEmitter<void>();
    @Input() taskToEdit!: Task;
    categories = this.taskService.categories;

    enteredTitle = '';
    enteredDescription = '';
    Status: TaskStatus = 'TO-DO';
    selectedCategory = '';
    newCategory = '';

ngOnInit() {
  if (this.taskToEdit) {
    this.enteredTitle = this.taskToEdit.title;
    this.enteredDescription = this.taskToEdit.description;
    this.selectedCategory = this.taskToEdit.category;
    this.newCategory = this.taskToEdit.category || '';
    this.Status = this.taskToEdit.status || 'TO-DO';
  }
}
    onCancel() {
    this.taskCancelled.emit();
    this.enteredTitle = '';
    this.enteredDescription = this.taskToEdit ? this.taskToEdit.description : '';
    this.newCategory = this.taskToEdit?.category || '';
    }
    onSave() {
        this.taskAdded.emit();
        const editedTask: Task = {
            title: this.enteredTitle,
            description: this.enteredDescription,
            category: this.selectedCategory,
            status: this.Status,
            date: new Date(),
        }
        if (this.taskToEdit) {
            this.taskService.editTask(this.taskToEdit, editedTask);
        }
    }
    onAddCategory() {
        this.newCategory = this.newCategory.trim();
        this.taskService.addCategory(this.newCategory);
        this.newCategory = '';
    }

}