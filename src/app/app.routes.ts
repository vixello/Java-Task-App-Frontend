// tasks.routes.ts
import { Routes } from '@angular/router';
import { TasksList } from './layout/tasks-list/tasks-list';
import { TaskCreate } from './layout/task-create/task-create';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full'},
  { path: 'tasks', component: TasksList },
  //{ path: 'create', component: TaskCreate}
];
