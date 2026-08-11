import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import {TaskDto, TaskPriority, TaskStatus, TaskService} from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'taskapp-task-create',
  standalone: true,
  imports: [FormsModule, FaIconComponent],
  templateUrl: './task-create.html',
  styleUrl: './task-create.scss',
})

export class TaskCreate {
  @ViewChild('taskDialog') dialog!: ElementRef<HTMLDialogElement>;
  @Output() created = new EventEmitter<TaskDto>();

  title = '';
  description = '';
  dueDate = '';
  priority = <TaskPriority>'LOW';
  status = <TaskStatus>'OPEN';

  constructor(private taskService: TaskService) { }

  open() {
    this.dialog.nativeElement.showModal();
  }

  close() {
    this.dialog.nativeElement.close();
  }
  submit() {
    this.taskService.createTask({
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      status: this.status
    }).subscribe({
      next: (newTask) =>{ 
        alert('Task created!');
        this.created.emit(newTask);
        this.close();
      }
    });
  }
}