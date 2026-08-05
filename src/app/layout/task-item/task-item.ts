import { Component, Input } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { TaskDto } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { faExclamationCircle, faExclamationTriangle, faCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'taskapp-task-item',
  imports: [CommonModule, FaIconComponent],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})

export class TaskItem {
  @Input() task!: TaskDto;
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

