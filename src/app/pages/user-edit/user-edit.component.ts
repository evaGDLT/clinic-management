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
  constructor(private formBuilder: FormBuilder, private service: UsersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
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
  createNewUserForm(): void {
    if (this.userType === 'patient'){
      this.userForm = this.formBuilder.group({
        personalData : this.formBuilder.group({
          name: [this.user.personalData.firstName],
          secondSurname: [this.user.personalData.secondLastName],
          firstSurname: [this.user.personalData.lastName],
          nhc: [this.user["personalData"]["NHC"]],
          gender: [this.user.personalData.gender],
          birthdate: [this.user.personalData.birthdate],
          nif: [this.user.personalData.NIF],
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
          name: [this.user.personalData.firstName],
          secondSurname: [this.user.personalData.secondLastName],
          firstSurname: [this.user.personalData.lastName],
          medicalBoardNumber: [this.user.personalData["medicalBoardNumber"]],
          gender: [this.user.personalData.gender],
          birthdate: [this.user.personalData.birthdate],
          nif: [this.user.personalData.NIF],
          professional: [this.user.personalData["professional"]],
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

  onFormSubmit (form): void{
    console.log("estos son los datos que voy a modificar:");
    console.log(form.value);
  }

}
