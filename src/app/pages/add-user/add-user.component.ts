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
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  userType: string;
  issurances: FormArray;

  DATE_PATTERN = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;

  constructor( private formBuilder: FormBuilder,
               private service: UsersService,
               private router: Router) {
               }

  ngOnInit(): void {
    this.userType = this.service.getUserType();
    this.createNewUserForm();
    this.issurances = this.userForm.get('issurances') as FormArray;
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
          birthdate: [null, Validators.pattern(this.DATE_PATTERN)],
          NIF: [null],
        }),
        address: this.formBuilder.group({
          city: [null],
          door: [null],
          street: [null],
          number: [null],
          postalCode: [null],
        }),
         issurances: this.formBuilder.array([
           this.formBuilder.group({
             name: [null],
             type: [null],
             cardNumber: [null]
           })
         ])
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
          birthdate: [null, Validators.pattern(this.DATE_PATTERN)],
          NIF: [null],
          professionalType: [null],
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

  addIssurances(): void{
    this.issurances.push(this.formBuilder.group({
      name: [null],
      type: [null],
      cardNumber: [null]
    }));
  }

  getFormErrorMessage(error: string): string {
    if (error === 'emptyValue'){
      return 'Debe introducir un valor';
    }
    if (error === 'invalidFormat'){
      return 'Formato inválido';
    }
  }

  onFormSubmit(form): void{
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
