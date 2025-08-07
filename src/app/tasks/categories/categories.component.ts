import { Component, EventEmitter, inject, Output } from "@angular/core";
import { TaskService } from "../task.service";

@Component({
    selector: 'app-categories',
    imports: [],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})

export class CategoriesComponent {
    private taskService = inject(TaskService);
    @Output() categorySelected = new EventEmitter<string>();
    
    get categories() {
        return this.taskService.categories;
    }

    onFilter(categoryName: string) {
        this.categorySelected.emit(categoryName);
    }
}