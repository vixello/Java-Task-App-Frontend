import { EventEmitter, Component, ViewChild, ElementRef, Input, signal, Output } from '@angular/core';
import {TaskDto, TaskPriority, TaskStatus, TaskService} from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'taskapp-task-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-update.html',
  styleUrl: './task-update.scss',
})
export class TaskUpdate {
  @ViewChild('taskDialog') dialog!: ElementRef<HTMLDialogElement>;
  @ViewChild('taskForm') taskForm!: HTMLFormElement;

  @Input() task!: TaskDto;

  @Output() updated = new EventEmitter<TaskDto>();

  title = signal('');
  description = signal('');
  dueDate = signal('');
  priority = signal<TaskPriority>('LOW');
  status = signal<TaskStatus>('OPEN');

  constructor(private taskService: TaskService) { }

  open(task: TaskDto) {
    this.task = task;

    this.title.set(task.title);
    this.description.set(task.description);
    this.dueDate.set(task.dueDate.split('T')[0]);
    this.priority.set(task.priority);
    this.status.set(task.status);

    setTimeout(() => { this.dialog.nativeElement.showModal(); });
  }

  close() {
    this.dialog.nativeElement.close();
  }


  submit() {
    this.taskService.updateTask(this.task.id, {
      title: this.title(),
      description: this.description(),
      dueDate: this.dueDate(),
      priority: this.priority(),
      status: this.status()
    }).subscribe({
      next: (updatedTask) => {
        console.log('UPDATE RESPONSE:', updatedTask);

        this.updated.emit(updatedTask);
        this.close();
      }
    });
  }
}
