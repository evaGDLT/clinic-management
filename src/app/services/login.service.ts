import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  URL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signUpUser(user: User): Observable<User>{
    return this.http.post<User>(this.URL + '/users', user);
  }
  signInUser(user: User): Observable<User>{
  //   this.http.get<User
  return null
  }
}
