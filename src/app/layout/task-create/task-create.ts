import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'taskapp-task-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-create.html',
  styleUrl: './task-create.scss',
})
export class TaskCreate {

  title = '';
  description = '';
  dueDate = '';
  priority = 'LOW';
  status = 'OPEN';

  constructor(private taskService: TaskService) { }

  submit() {
    this.taskService.createTask({
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      status: this.status
    }).subscribe({
      next: () => alert('Task created!')
    });
  }
}