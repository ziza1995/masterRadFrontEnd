import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MyDialogModalComponent } from './modals/my-dialog-modal/my-dialog-modal.component';
import { TokenInterceptor } from './token-interceptor';
import { UserDetailsComponent } from './auth/user_details/user_details';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    MyDialogModalComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatDialogModule

  ],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
