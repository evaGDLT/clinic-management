import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListUsersComponent } from './list-users/list-users/list-users.component';
import { UserInfoComponent } from './user-info/user-info/user-info.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MaterialModule} from './material.module';
@NgModule({
  declarations: [
    AppComponent,
    ListUsersComponent,
    UserInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
