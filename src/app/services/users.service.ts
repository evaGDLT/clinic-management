import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Professional } from '../models/Professional.model';
import { Patient } from '../models/Patient.model';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  URL = 'http://localhost:3000';//Cambiar esto a variables 
  
  userType: string;
  private patientsObs$: BehaviorSubject<Patient[]> = new BehaviorSubject(null);
  private professionalsObs$: BehaviorSubject<Professional[]> = new BehaviorSubject(null);

  constructor(private http: HttpClient) { }

  /*
  Getters/Setters
  */
  setUserType(user): void{
    this.userType = user;
  }
  getUserType(): string{
    return this.userType;
  }
  getPatientsObs(): Observable<Patient[]> {
    return this.patientsObs$.asObservable();
  }
  setPatientsObs (patient: Patient[]) {
    this.patientsObs$.next(patient);
  }
  getProfessionalsObs(): Observable<Professional[]> {
    return this.professionalsObs$.asObservable();
  }
  setProfessionalsObs (professional: Professional[]) {
    this.professionalsObs$.next(professional);
  }
  
  /*
  Patient Methods
   */
  getPatients(): Observable<Patient[]>{
    return this.http.get<(Patient)[]>(this.URL + '/patients');
  }
  getPatientById(id: string): Observable<Patient>{
    return this.http.get<Patient>(this.URL + '/patients/' + id);
  }
  deletePatientById(id: string): Observable<Patient>{
    return this.http.delete<Patient>(this.URL + '/patients/' + id);
  }
  /*
  Professinal Methods
   */
  getProfessionals(): Observable<Professional[]>{
    return this.http.get<(Professional)[]>(this.URL + '/professionals');
  }
  getProfessionalById(id: string): Observable<Professional>{
    return this.http.get<Professional>(this.URL + '/professionals/' + id);
  }
  deleteProfessionalById(id: string): Observable<Professional>{
    return this.http.delete<Professional>(this.URL + '/professionals/' + id);
  }
}