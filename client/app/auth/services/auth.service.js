import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { StorageService } from './storage.service';
import { RequestService } from './request.service';

@Injectable()
export class AuthService {
  loggedIn = new BehaviorSubject(false);
  constructor(http: Http, storage: StorageService, request: RequestService) {
    this.http = http;
    this.storage = storage;
    this.request = request;
    if (!!this.storage.getAuthToken()) {
      this.loggedIn.next(true);
    }
  }
  login(credentials) {
    return this.http
      .post('/login', JSON.stringify(credentials), {
        headers: this.request.getJsonHeaders(),
      })
      .map(res => res.json())
      .map((res) => {
        this.storage.setAuthToken(res.authToken);
        this.loggedIn.next(true);
        return true;
      })
      .catch((res) => {
        return this.loggedIn.error(res.text());
      });
  }
  logout() {
    this.storage.removeAuthToken();
    this.loggedIn.next(false);
  }
  isLoggedIn() {
    return this.loggedIn.getValue();
  }
  getLoggedIn() {
    return this.loggedIn;
  }
}
