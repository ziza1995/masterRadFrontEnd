import { Component, OnInit, Optional, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-dialog-modal',
  templateUrl: './my-dialog-modal.component.html',
  styleUrls: ['./my-dialog-modal.component.css']
})
export class MyDialogModalComponent implements OnInit {


  fromPage: string;
  username: string;

  constructor(
    public dialogRef: MatDialogRef<MyDialogModalComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.fromPage = data.pageValue;
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close', data: this.username });
  }

}