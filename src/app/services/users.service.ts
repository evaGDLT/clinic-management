import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Professional } from '../models/Professional.model';
import { Patient } from '../models/Patient.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class UsersService {
  URL = 'http://localhost:3000';//Cambiar esto a variables 
  userType: string;
  private actualRoute$: BehaviorSubject<Router> = new BehaviorSubject(null);
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
  setPatientsObs(patient: Patient[]): void {
    this.patientsObs$.next(patient);
  }
  getProfessionalsObs(): Observable<Professional[]> {
    return this.professionalsObs$.asObservable();
  }
  setProfessionalsObs(professional: Professional[]): void {
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
  insertPatient(patient: Patient): Observable<Patient>{
    return this.http.post<Patient>(this.URL + '/patients', patient);
  }
  updatePatient(patient: Patient, id: string): Observable<Patient>{
    return this.http.put<Patient>(this.URL + '/patients/' + id, patient);
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
  insertProfessional(professinal: Professional): Observable<Professional>{
    return this.http.post<Professional>(this.URL + '/professionals', professinal);
  }
  updateProfessional(professional: Professional, id: string): Observable<Professional>{
    return this.http.put<Professional>(this.URL + '/professionals/' + id, professional);
  }
}