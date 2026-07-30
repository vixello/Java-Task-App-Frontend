import { Component, ViewChild, ElementRef } from '@angular/core';
import { TaskService } from '../../services/task.service';
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

  title = '';
  description = '';
  dueDate = '';
  priority = 'LOW';
  status = 'OPEN';

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
      next: () => alert('Task created!')
    });
  }
}