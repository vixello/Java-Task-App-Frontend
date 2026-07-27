import { Component } from '@angular/core';
import { TaskItem } from "../task-item/task-item";

@Component({
  selector: 'taskapp-tasks-list',
  imports: [TaskItem],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {}
