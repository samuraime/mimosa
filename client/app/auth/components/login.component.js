import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import template from './login.component.html';
import style from './login.component.scss';

@Component({
  selector: 'mms-login',
  template,
  styles: [style],
})
export class LoginComponent {
  constructor(builder: FormBuilder, authService: AuthService, router: Router) {
    this.authService = authService;
    this.router = router;
    this.loginForm = builder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit(credentials) {
    this.authService.login(credentials).subscribe(() => {
      this.router.navigate(['']);
    }, () => {
      this.loginForm.reset();
    });
  }
}
