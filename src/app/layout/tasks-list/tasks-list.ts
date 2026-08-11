import { Component, ViewChild, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TaskItem } from "../task-item/task-item";
import { TaskCreate } from "../task-create/task-create";
import { TaskDto, TaskService } from '../../services/task.service';
import { TaskItemSkeleton } from "../task-item-skeleton/task-item-skeleton";
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { signal } from '@angular/core';
import { TaskUpdate } from "../task-update/task-update";
import { FaIconComponent } from "@fortawesome/angular-fontawesome";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'taskapp-tasks-list',
  standalone: true,
  imports: [CommonModule, TaskItem, TaskCreate, TaskItemSkeleton, TaskUpdate, FaIconComponent, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './tasks-list.html',
  styleUrl: './tasks-list.scss',
})
export class TasksList {
  @ViewChild('taskUpdate', { read: TaskUpdate })

  updateModal!: TaskUpdate;

  loading = signal(true);
  tasks = signal<TaskDto[]>([]);
  priorityOrder: Record<string, number> = {
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3
  };

  searchQuery = '';
  dateQuery = '';

  constructor(
    private taskService: TaskService,
    private router: Router
  ) { };

  ngOnInit() {
    this.fetchTasks();

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects.startsWith('/tasks')) {
        this.fetchTasks();
      }
    });

  }

  fetchTasks() {
    this.loading.set(true);

    this.taskService.getTasks().subscribe(tasks => {
      this.tasks.set(tasks);
      this.loading.set(false);
    });
  }

  openUpdateDialog(task: TaskDto) {
    console.log('TASK:', task);
    console.log('UPDATE MODAL:', this.updateModal);
    console.log('OPEN:', typeof this.updateModal?.open);

    this.updateModal.open(task);
  }

  updateTaskInList(updatedTask: TaskDto) {
    console.log('PARENT UPDATE:', updatedTask);

    this.tasks.update(tasks => {
      const result = tasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      );

      console.log('AFTER UPDATE:', result);
      return result;
    });
  }

  deleteTaskFromList(taskId: string) {
    console.log('PARENT DELETE:', taskId);
    console.log('BEFORE:', this.tasks());

    this.tasks.update(tasks => {
      const result = tasks.filter(task => task.id !== taskId);

      console.log('AFTER:', result);
      return result;
    });
  }

  addTaskToList(newTask: TaskDto) {
    console.log('PARENT CREATE:', newTask);

    this.tasks.update(tasks => {
      const result = [...tasks, newTask];

      console.log('AFTER CREATE:', result);
      return result;
    });
  }

  onDateChange(event: Event) {
    this.dateQuery = (event.target as HTMLInputElement).value;
  }

  clearDate() {
    this.dateQuery = '';
  }
  
  get groupedTasks() {
    const groups: Record<string, TaskDto[]> = {};
    const query = this.searchQuery.trim().toLowerCase();
    const date = this.dateQuery;

    const list = this.tasks().filter(task => {
      const matchesText = !query ||
        task.title.toLowerCase().includes(query) ||
        task.description.toLowerCase().includes(query);
      const matchesDate =
        !date || task.dueDate === date;

      return matchesText && matchesDate;
    }

    );

    for (const task of list) {
      const date = task.dueDate;
      if (!groups[date]) groups[date] = [];
      groups[date].push(task);
    }

    for (const date of Object.keys(groups)) {
      groups[date].sort((a, b) =>
        this.priorityOrder[a.priority] - this.priorityOrder[b.priority]
      );
    }

    return groups;
  }

  get groupedDates() {
    return Object.keys(this.groupedTasks);
  }

}
