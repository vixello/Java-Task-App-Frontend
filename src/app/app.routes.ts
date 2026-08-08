// tasks.routes.ts
import { Routes } from '@angular/router';
import { TasksList } from './layout/tasks-list/tasks-list';
import { TaskCreate } from './layout/task-create/task-create';
import { Home } from './layout/home/home';

export const routes: Routes = [
  //{ path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '', component: Home },
  { path: 'tasks', component: TasksList, data: { noReuse: true } }
  //{ path: 'create', component: TaskCreate}
];
