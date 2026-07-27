import { Component } from '@angular/core';
import { FaIconComponent } from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'taskapp-task-item',
  imports: [FaIconComponent],
  templateUrl: './task-item.html',
  styleUrl: './task-item.scss',
})
export class TaskItem {}
