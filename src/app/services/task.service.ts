import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export type TaskStatus = 'OPEN' | 'COMPLETE';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface TaskDto {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    priority: TaskPriority;
    status: TaskStatus;
}

@Injectable({
    providedIn: 'root'
})

export class TaskService {
    private apiUrl = 'http://localhost:8080/api/v1/tasks';

    constructor(private http: HttpClient) { }

    getTasks(): Observable<TaskDto[]> {
        return this.http.get<TaskDto[]>(this.apiUrl);
    }

    createTask(task: Omit<TaskDto, 'id'>): Observable<TaskDto> {
        return this.http.post<TaskDto>(this.apiUrl, task);
    }

    updateTask(taskId: string, task: Omit<TaskDto, 'id'>): Observable<TaskDto> {
        return this.http.put<TaskDto>(`${this.apiUrl}/${taskId}`, task);
    }

    deleteTask(taskId: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
    }
}