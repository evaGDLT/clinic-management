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
        this.service.getUserById(params.id).subscribe(
          user=>{
            this.user = user;
            this.userType = user.type;
            console.log("el usuario que voy a modificar es:");
            console.log(this.user);
          }
        )
      }
    });
    //this.userType = this.service.getUser();
    this.userType = 'patient';
    this.createNewUserForm();
  }
  createNewUserForm(): void {
    if (this.userType === 'patient'){
      this.userForm = this.formBuilder.group({
        personalData : this.formBuilder.group({
          name: ["pepe"],
          secondSurname: ["perez"],
          firstSurname: ["perez"],
          nhc: ["22222"],
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
          name: [null],
          secondSurname: [null],
          firstSurname: [null],
          medicalBoardNumber: [null],
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

  onFormSubmit(form){
    console.log("estos son los datos que voy a modificar:");
    console.log(form.value);
  }

}
