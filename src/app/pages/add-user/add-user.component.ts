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
import { UsersService } from '../../services/users.service';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup = this.formBuilder.group({});
  userType: string;
  constructor( private formBuilder: FormBuilder, private service: UsersService) { }
  ngOnInit(): void {
    this.userType = this.service.getUser();
    this.createNewUserForm();
  }
  createNewUserForm(): void {
    if (this.userType === 'patient'){
      this.userForm = this.formBuilder.group({
        personalData : this.formBuilder.group({
          name: [null, Validators.required],
          secondSurname: [null],
          firstSurname: [null, Validators.required],
          nhc: [null, Validators.required],
          gender: [null],
          birthdate: [null],
          nif: [null],
          professional: [null],
        }),
        address: this.formBuilder.group({
          city: [null],
          door: [null],
          street: [null],
          number: [null],
          postalCode: [null],
        }),
        insuranceCompanies: this.formBuilder.array([]),
      });
    }
    if (this.userType === 'professional'){
      this.userForm = this.formBuilder.group({
        personalData : this.formBuilder.group({
          name: [null, Validators.required],
          secondSurname: [null],
          firstSurname: [null, Validators.required],
          medicalBoardNumber: [null, Validators.required],
          gender: [null],
          birthdate: [null],
          nif: [null],
          professional: [null],
        }),
        address: this.formBuilder.group({
          city: [null],
          door: [null],
          street: [null],
          number: [null],
          postalCode: [null],
        }),
      });
    }
 
  }
  getErrorMessage() {
    return 'Debe introducir un valor';
  }
  onFormSubmit(form){
    console.log(form.value);
  }
 
}
