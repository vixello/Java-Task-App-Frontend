import { Component } from '@angular/core';
import { TaskItem } from "../task-item/task-item";
import { TaskCreate } from "../task-create/task-create";

@Component({
  selector: 'taskapp-tasks-list',
  imports: [TaskItem, TaskCreate],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {}
