import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './list-users/list-users/list-users.component';
import { UserInfoComponent } from './user-info/user-info/user-info.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [
  { path: 'users/new', component: AddUserComponent },
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  { path: 'users', component: ListUsersComponent },
  { path: 'users/:id', component: UserInfoComponent },
  { path: 'users/:id/edit', component: UserEditComponent }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
