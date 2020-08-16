import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;
  message: string;
  dialogValue: string;
  sendValue: string;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) {
    this.loginRequestPayload = {
      username: '',
      password: '',
    };
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      if (params.registered !== undefined && params.registered === 'true') {
        this.toastr.success('Signup Successful');
        this.registerSuccessMessage =
          'Please Check your inbox for activation email ' +
          'activate your account before you Login!';
      }
    });
  }

  login() {
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(
      (data) => {
        this.isError = false;
        this.router.navigateByUrl('');
        this.toastr.success('Login Successful');
      },
      (error) => {
        this.isError = true;
        this.message = error.error.message;
        throwError(error);
      }
    );
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MyDialogModalComponent, {
      width: '250px',
      backdropClass: 'custom-dialog-backdrop-class',
      panelClass: 'custom-dialog-panel-class',
      data: { pageValue: this.sendValue }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.authService.resetPassword(result.data);
    });
  }
}

