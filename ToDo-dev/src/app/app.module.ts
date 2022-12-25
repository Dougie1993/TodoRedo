import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskViewComponent } from './layout/task-view/task-view.component';
import { NewListComponent } from './layout/new-list/new-list.component';
import { NewTaskComponent } from './layout/new-task/new-task.component';
import { LoginComponent } from './layout/login/login.component';
import { WebRequestInterceptor } from './web-request.interceptor';
import { SignUpComponent } from './layout/sign-up/sign-up.component';
import { EditListComponent } from './layout/edit-list/edit-list.component';
import { EditTaskComponent } from './layout/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskViewComponent,
    NewListComponent,
    NewTaskComponent,
    LoginComponent,
    SignUpComponent,
    EditListComponent,
    EditTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
