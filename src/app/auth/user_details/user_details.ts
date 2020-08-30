import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AuthService, UserDetails } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MyDialogModalComponent } from 'src/app/modals/my-dialog-modal/my-dialog-modal.component';

export interface DialogData {
  username: string;
  name: string;
}

@Component({
  selector: 'app-user_details',
  templateUrl: './user_details.html',
  styleUrls: ['./user_details.css'],
})
export class UserDetailsComponent implements OnInit {
  loginForm: FormGroup;
  registerSuccessMessage: string;
  isError: boolean;
  message: string;
  dialogValue: string;
  sendValue: string;
  username: string;
  isEditable: boolean;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.authService.username.subscribe(
      (data: string) => (this.username = data)
    );
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      accountNumber: new FormControl('', Validators.required),
    });
    this.authService.getUserDetailsByUsername().subscribe(
      (data) => {
        this.loginForm = new FormGroup({
          username: new FormControl(data.username, Validators.required),
          accountNumber: new FormControl(data.accountNumber, Validators.required),
        });
        this.isEditable = false;
      },
      (error) => {
        this.isError = true;
        this.message = error.error.message;
        throwError(error);
      }
    );
  }


  edit() {
    this.isEditable = true;
  }
}

