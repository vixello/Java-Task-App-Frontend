import { Component } from '@angular/core';
import { TaskItem } from "../task-item/task-item";
import { TaskCreate } from "../task-create/task-create";
import { TaskDto, TaskService } from '../../services/task.service';
import { TaskItemSkeleton } from "../task-item-skeleton/task-item-skeleton";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'taskapp-tasks-list',
  imports: [CommonModule, TaskItem, TaskCreate, TaskItemSkeleton],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {
  loading = true;
  tasks: TaskDto[] = [];

  constructor(private taskService: TaskService){};

  ngOnInit(){
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.loading = false;
    })
  }
}
