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
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  userType: string;
  constructor( private formBuilder: FormBuilder, private service: UsersService, private router: Router) { }
  ngOnInit(): void {
    this.userType = this.service.getUserType();
    this.createNewUserForm();
  }
  createNewUserForm(): void {
    if (this.userType === 'patient'){
      this.userForm = this.formBuilder.group({
        personalData : this.formBuilder.group({
          firstName: [null, Validators.required],
          secondSurname: [null],
          lastName: [null, Validators.required],
          NHC: [null, Validators.required],
          gender: [null],
          birthdate: [null],
          NIF: [null],
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
          firstName: [null, Validators.required],
          secondSurname: [null],
          lastName: [null, Validators.required],
          medicalBoardNumber: [null, Validators.required],
          gender: [null],
          birthdate: [null],
          NIF: [null],
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
  getErrorMessage(): string {
    return 'Debe introducir un valor';
  }
  onFormSubmit(form): void{
    console.log(form.value);
    if (form.status === 'VALID') {
      if (this.userType === 'patient'){
        this.service.insertPatient(form.value).subscribe( patient => {
          this.router.navigateByUrl('/users');
        });
      }
      if (this.userType === 'professional'){
        this.service.insertProfessional(form.value).subscribe( professional => {
          this.router.navigateByUrl('/users');
        });
      }
    }
  }
 
 
}
