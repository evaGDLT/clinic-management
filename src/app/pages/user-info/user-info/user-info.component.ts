import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from '../../../services/users.service';
import { Professional } from '../../../models/Professional.model';
import { Patient } from '../../../models/Patient.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  user: Patient | Professional;
  typeUser: string;
  displayedColumnsIssurances: string[] = ['cardNumber', 'name', 'type'];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.id){
        this.typeUser = this.userService.getUserType();
        if(this.userService.getUserType() === 'patient'){
          this.userService.getPatientById(params.id).subscribe(
            patient => {
              this.user = patient;
            }
          )
        }
        if(this.userService.getUserType() === 'professional'){
          this.userService.getProfessionalById(params.id).subscribe(
            professinal => {
              this.user = professinal;
            }
          )
        }
      }
    });
  }

}
