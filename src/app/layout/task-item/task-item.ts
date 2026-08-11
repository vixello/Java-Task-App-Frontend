import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TaskDto } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { faExclamationCircle, faExclamationTriangle, faCircle } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from '../../services/task.service'

@Component({
  selector: 'taskapp-task-item',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})

export class TaskItem {
  @Input() task!: TaskDto;

  @Output() edit = new EventEmitter<TaskDto>();
  @Output() finish = new EventEmitter<TaskDto>();
  @Output() deleted = new EventEmitter<string>();

  constructor(private taskService: TaskService) { }

  editTask() {
    this.edit.emit(this.task);
  }

  deleteTask() {
    if (!this.task) return;
    this.taskService.deleteTask(this.task.id).subscribe({
      next: () => {
        alert('Task deleted!');
        this.deleted.emit(this.task.id);
      }
    });
  }

  finishing = false;
  unFinishing = false;

  finishTask() {
    if (this.finishing) return;

    this.finishing = true;

    this.taskService.updateTask(this.task.id, {
      title: this.task.title,
      description: this.task.description,
      dueDate: this.task.dueDate,
      priority: this.task.priority,
      status: 'COMPLETE'
    }).subscribe({
      next: (updatedTask) => {
        setTimeout(() => {
          this.finish.emit(updatedTask);
        }, 350);
      },
      error: () => {
        this.finishing = false;
      }
    });
  }

  unfinishTask() {
    if (this.unFinishing) return;

    this.unFinishing = true;

    this.taskService.updateTask(this.task.id, {
      title: this.task.title,
      description: this.task.description,
      dueDate: this.task.dueDate,
      priority: this.task.priority,
      status: 'OPEN'
    }).subscribe({
      next: (updatedTask) => {
        setTimeout(() => {
          this.finish.emit(updatedTask);
        }, 350);
      },
      error: () => {
        this.unFinishing = false;
      }
    });
  }

  get priorityIcon() {
    switch (this.task.priority) {
      case 'HIGH':
        return faExclamationCircle;
      case 'MEDIUM':
        return faExclamationTriangle;
      case 'LOW':
        return faCircle;
      default:
        return faCircle;
    }
  }

  get priorityColor() {
    switch (this.task.priority) {
      case 'HIGH':
        return 'text-red-600';
      case 'MEDIUM':
        return 'text-yellow-500';
      case 'LOW':
        return 'text-green-600';
      default:
        return 'text-gray-500';
    }
  }

}

