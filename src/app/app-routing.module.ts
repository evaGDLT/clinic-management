import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './list-users/list-users/list-users.component';
import { UserInfoComponent } from './user-info/user-info/user-info.component';


const routes: Routes = [
  { path: '', component: AppComponent},
  { path: 'users', component: ListUsersComponent },
  { path: 'users/:id', component: UserInfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
