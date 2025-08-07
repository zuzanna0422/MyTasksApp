import { Injectable } from "@angular/core";
import { Task } from "./task.model";


@Injectable({
    providedIn: 'root'
})

export class TaskService{
    private Tasks: Task[] = [];

    categories: string[] = ['work', 'home', 'study'];

    private saveTasksToLocalStorage(): void {
    localStorage.setItem('tasks', JSON.stringify(this.Tasks));
    }
    private saveCategoriesToLocalStorage(): void {
    localStorage.setItem('categories', JSON.stringify(this.categories));
    }


    constructor() {
        const savedTasks = localStorage.getItem('tasks');
        this.Tasks = savedTasks ? JSON.parse(savedTasks) : [];
        const savedCategories = localStorage.getItem('categories');
        this.categories = savedCategories ? JSON.parse(savedCategories) : this.categories;
    }
    
    get allTask() {
        return [...this.Tasks];
    }


    addTask(task: Task) {
        this.Tasks.push(task);
        this.saveTasksToLocalStorage();
    }

    addCategory(category: string) {
        category = category.trim();
        if (!category) return;

        if (!this.categories.includes(category)) {
            this.categories.push(category);
            this.saveCategoriesToLocalStorage();
        }
    }

    deleteCategory(category: string) {
        this.categories = this.categories.filter(cat => cat !== category);
        this.saveCategoriesToLocalStorage();
    }

    deleteTask(taskToDelete: Task) {
        this.Tasks = this.Tasks.filter(task => task !== taskToDelete );
        this.saveTasksToLocalStorage();
    }
    
    markAsDoneTask(task: Task) {
        task.status = task.status === 'TO-DO' ? 'DONE' : 'TO-DO';
        this.saveTasksToLocalStorage();
    }

    getFilteredTask(category: string) {
        if (category === 'all'){
            return this.allTask;
        }
        else {
            return this.allTask.filter((el) => el.category === category);
        }
    
    }

    editTask(task: Task, editedTask: Task) {
        const index = this.Tasks.indexOf(task);
        if (index !== -1) {
        this.Tasks[index] = { ...editedTask };
        this.saveTasksToLocalStorage();
        }
    }
}