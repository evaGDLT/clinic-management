import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Patient } from 'src/app/models/Patient.model';
import { Professional } from 'src/app/models/Professional.model';
import { isFormattedError } from '@angular/compiler';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListUsersComponent implements OnInit {
  displayedColumnsPatients: string[] = ['NHC', 'Nombre', 'Apellido', 'Opciones'];
  
  dataSourcePatients: (Patient | Professional)[];
  dataSourceProfessionals: (Patient | Professional)[];

  displayedColumnsProfessionals: string[] = ['noColegiado', 'Nombre', 'Apellido', 'Profesional', 'Opciones'];

  constructor(private userService: UsersService) { 
  }
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.dataSourcePatients=users.filter(user=> user.type=="patient");
        this.dataSourceProfessionals=users.filter(user=> user.type=="professional");
        
      }
    );
  }
}
