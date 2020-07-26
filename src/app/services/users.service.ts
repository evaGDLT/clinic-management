import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Professional } from '../models/Professional.model';
import { Patient } from '../models/Patient.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  URL = 'http://localhost:3000';
  user: string;

  constructor(private http: HttpClient) { }

  setUser(user):void{
    this.user=user;
  }
  getUser(): string{
    return this.user;
  }
  getUsers(): Observable<(Professional | Patient)[]>{
    return this.http.get<(Professional | Patient)[]>(this.URL + '/users');
  }
  getUserById(id: string): Observable<(Patient | Professional)>{
    return this.http.get<Patient>(this.URL + '/users/' + id);
  }
  
}