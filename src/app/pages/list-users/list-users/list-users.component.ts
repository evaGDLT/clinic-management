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
  displayedColumnsProfessionals: string[] = ['noColegiado', 'Nombre', 'Profesional', 'Opciones'];
  dataSourcePatients: (Patient)[];
  dataSourceProfessionals: (Professional)[];

  constructor(
    private userService: UsersService, 
    private router: Router, 
    public dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.userService.getPatientsObs().subscribe(patients => this.dataSourcePatients = patients);
    this.userService.getProfessionalsObs().subscribe(professionals => this.dataSourceProfessionals = professionals);
    this.getUsers();
  }

  getUsers(): void{
    this.userService.getPatients().subscribe(
      patients => {
        this.userService.setPatientsObs(patients);
      }
    );
    this.userService.getProfessionals().subscribe(
      professionals => {
        this.userService.setProfessionalsObs(professionals);
      }
    );
  }

  goToCreateUser(typeUser): void{
    this.userService.setUserType(typeUser);
    this.router.navigateByUrl('/users/new');
  }

  goToShowInfoUser(typeUser, id): void{
    this.userService.setUserType(typeUser);
    this.router.navigate(['/users/' , id]);
  }

  goToEditUser(typeUser, id){
    this.userService.setUserType(typeUser);
    this.router.navigate(['/users/'+ id +'/edit']);
  }
  openDeleteDialog(user, id): void{
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
      data: {
        title: 'Borrar ' + user,
        body: '¿Está seguro de borrar ' + user + '?',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (user === 'patient'){
          this.userService.deletePatientById(id).subscribe(() => {
            this.getUsers();
          })
        }
        if (user === 'professional'){
          this.userService.deleteProfessionalById(id).subscribe(() => {
            this.getUsers();
          })
        }
      }
    })
  }
}
