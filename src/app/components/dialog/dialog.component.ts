
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';

import { ListUsersComponent } from '../../pages/list-users/list-users/list-users.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})

export class DialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ListUsersComponent>,
    private service: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; body: string }
  ) {}

  closeDialog(): void {
    this.dialogRef.close();
  }
  deleteUser(){
    
  }
}
