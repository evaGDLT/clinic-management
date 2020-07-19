import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './list-users/list-users/list-users.component';
import { UserInfoComponent } from './user-info/user-info/user-info.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AddUserComponent } from './add-user/add-user.component';

import { HeaderComponent } from './components/header/header.component';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from './material.module';
@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    UserInfoComponent,
    UserEditComponent,
    AddUserComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
