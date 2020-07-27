import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { Patient } from 'src/app/models/Patient.model';
import { Professional } from 'src/app/models/Professional.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogComponent} from '../../../components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ListUsersComponent implements OnInit {
  displayedColumnsPatients: string[] = ['NHC', 'Nombre', 'NIF', 'Opciones'];
  
  dataSourcePatients: (Patient | Professional)[];
  dataSourceProfessionals: (Patient | Professional)[];

  displayedColumnsProfessionals: string[] = ['noColegiado', 'Nombre', 'Profesional', 'Opciones'];

  constructor(private userService: UsersService, private router: Router, public dialog: MatDialog) { 
  }
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      users => {
        this.dataSourcePatients=users.filter(user=> user.type=="patient");
        this.dataSourceProfessionals=users.filter(user=> user.type=="professional");
      }
    );
  }
  goToCreateUser(typeUser): void{
    this.userService.setUser(typeUser);
    this.router.navigateByUrl('/users/new');
  }
  openDeleteDialog(user): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Borrar ' + user,
        body: '¿Está seguro de borrar ' + user + '?',
      },
    });
  }
}
