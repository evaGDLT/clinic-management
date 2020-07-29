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
  ValidationErrors
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Professional } from 'src/app/models/Professional.model';
import { Patient } from 'src/app/models/Patient.model';


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  userForm: FormGroup = this.formBuilder.group({});
  userType: string;
  user: Patient | Professional;
  id: string;
  DATE_PATTERN = /^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/;

  constructor(private formBuilder: FormBuilder, 
              private service: UsersService, 
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      if (params.id){
        this.userType = this.service.getUserType();
        if (this.userType  === 'patient'){
          this.service.getPatientById(params.id).subscribe(
            patient => {
              this.user = patient;
              this.createNewUserForm();
            }
          );
        }
        if (this.userType  === 'professional'){
          this.service.getProfessionalById(params.id).subscribe(
            professional => {
              this.user = professional;
              this.createNewUserForm();
            }
          );
        }
      }
    });
  }
  getFormErrorMessage(error: string): string {
    if (error === 'emptyValue'){
      return 'Debe introducir un valor';
    }
    if (error === 'invalidFormat'){
      return 'Formato inválido';
    }
  }
  createNewUserForm(): void {
    if (this.userType === 'patient'){
      this.userForm = this.formBuilder.group({
        personalData : this.formBuilder.group({
          firstName: [this.user.personalData.firstName],
          secondSurname: [this.user.personalData.secondLastName],
          lastName: [this.user.personalData.lastName],
          NHC: [this.user["personalData"]["NHC"]],
          gender: [this.user.personalData.gender],
          birthdate: [this.user.personalData.birthdate, Validators.pattern(this.DATE_PATTERN)],
          NIF: [this.user.personalData.NIF],
        }),
        address: this.formBuilder.group({
          city: [this.user.address.city],
          door: [this.user.address.door],
          street: [this.user.address.street],
          number: [this.user.address.number],
          postalCode: [this.user.address.postalCode],
        }),
        insuranceCompanies: this.formBuilder.array([]),
      });
    }
    if (this.userType === 'professional'){
      this.userForm = this.formBuilder.group({
        personalData : this.formBuilder.group({
          firstName: [this.user.personalData.firstName],
          secondSurname: [this.user.personalData.secondLastName],
          lastName: [this.user.personalData.lastName],
          medicalBoardNumber: [this.user.personalData["medicalBoardNumber"]],
          gender: [this.user.personalData.gender],
          birthdate: [this.user.personalData.birthdate, Validators.pattern(this.DATE_PATTERN)],
          NIF: [this.user.personalData.NIF],
          professionalType: [this.user.personalData["professionalType"]],
        }),
        address: this.formBuilder.group({
          city: [this.user.address.city],
          door: [this.user.address.door],
          street: [this.user.address.street],
          number: [this.user.address.number],
          postalCode: [this.user.address.postalCode],
        }),
      });
    }
  }

  onFormSubmit(form): void{
    if (form.status === 'VALID') {
      if (this.userType === 'patient'){
        this.service.updatePatient(form.value, this.id).subscribe( patient => {
          this.router.navigateByUrl('/users');
        });
      }
      if (this.userType === 'professional'){
        this.service.updateProfessional(form.value, this.id).subscribe( professional => {
          this.router.navigateByUrl('/users');
        });
      }
    }
  }

}
