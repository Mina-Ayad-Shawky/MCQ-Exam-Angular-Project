import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}

  confirmDelete(): void {
    this.dialogRef.close('confirm');  // Close dialog with 'confirm' to indicate confirmation
  }

  cancelDelete(): void {
    this.dialogRef.close();  // Close dialog without confirmation
  }
}
