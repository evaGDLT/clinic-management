import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './pages/list-users/list-users/list-users.component';
import { UserInfoComponent } from './pages/user-info/user-info/user-info.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'users/new', component: AddUserComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },

  { path: 'users', component: ListUsersComponent },
  { path: 'users/:id', component: UserInfoComponent },
  { path: 'users/:id/edit', component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
