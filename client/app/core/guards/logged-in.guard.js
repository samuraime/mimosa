import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';

@Injectable()
export class LoggedInGuard {
  constructor(auth: AuthService) {
    this.auth = auth;
  }
  canActivate() {
    return this.auth.isLoggedIn();
  }
}
