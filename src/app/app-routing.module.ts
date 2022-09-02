import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackendErrorComponent } from './backend-error/backend-error.component';

import { TaskHomeComponent } from './task-home/task-home.component';
import { TaskLoginComponent } from './task-login/task-login.component';

const routes: Routes = [
  {path: '', component: TaskHomeComponent },
  {path: 'login', component: TaskLoginComponent },
  {path: 'error', component: BackendErrorComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
