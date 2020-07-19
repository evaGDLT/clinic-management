import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  FormBuilder,
  FormGroup,
  FormArray,
  AbstractControl,
  NgForm,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  personalDataGroup: FormGroup;
  userTypes = ['Patient', 'Professional'];
  constructor( private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.createNewUserForm();
  }
  onFormSubmit(){}
 /**
   * Creates the user form with a fixed set of controls.
   */
  createNewUserForm(): void {
    this.personalDataGroup = this.formBuilder.group({
      name: [null, Validators.required],
      secondSurname: [null],
      firstSurname: [null, Validators.required],
      nhc: [null, Validators.required],
      medicalBoardNumber: [null],
      //userType: ['Patient'],
      gender: [null],
      birthdate: [null],
      nif: [null],
      professional: [null],
      address: this.formBuilder.group({
        city: [null],
        doorNumber: [null],
        street: [null],
        streetNumber: [null],
        postalCode: [null],
      }),
      insuranceCompanies: this.formBuilder.array([]),
    })
  }
  getErrorMessage() {
    return 'Debe introducir un valor';
  }
 
}
