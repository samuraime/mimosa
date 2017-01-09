import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';

import { StorageService } from './storage.service';

@Injectable()
export class RequestService {
  constructor(storage: StorageService) {
    this.storage = storage;
  }
  getAuthHeaders(isJson = true) {
    const headers = new Headers();
    const authToken = this.storage.getAuthToken();
    headers.append('Authorization', `Bearer ${authToken}`);
    if (isJson) {
      headers.append('Content-Type', 'application/json');
    }
    return headers;
  }
  getJsonHeaders() {
    const headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return headers;
  }
}
