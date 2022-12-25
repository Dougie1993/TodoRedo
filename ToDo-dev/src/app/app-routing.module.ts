import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditListComponent } from './layout/edit-list/edit-list.component';
import { EditTaskComponent } from './layout/edit-task/edit-task.component';
import { LoginComponent } from './layout/login/login.component';
import { NewListComponent } from './layout/new-list/new-list.component';
import { NewTaskComponent } from './layout/new-task/new-task.component';
import { SignUpComponent } from './layout/sign-up/sign-up.component';
import { TaskViewComponent } from './layout/task-view/task-view.component';


const routes: Routes = [
  { path: '', redirectTo: 'lists', pathMatch: 'full' },
  { path: 'new-list', component: NewListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'lists', component: TaskViewComponent },
  { path: 'lists/:listId', component: TaskViewComponent },
  { path: 'lists/:listId/new-task', component: NewTaskComponent }, // this is to get the list from the url
                                                                    // very useful when target a specific objects contents
  { path: 'sign-up', component: SignUpComponent},
  { path: 'edit-list/:listId', component: EditListComponent},
  { path: 'edit-task/:listId/task/:taskId', component: EditTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
