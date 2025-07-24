export type TaskStatus =  'TO-DO' | 'DONE';

export interface Task {
    title: string,
    description: string,
    category: string,
    status: TaskStatus,
    date: Date
}