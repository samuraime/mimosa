import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { RequestService } from '../../auth/services/request.service';
import { Subject } from 'rxjs/Subject';

/**
 * @param {Headers} headers @angular/http Headers
 */
function upload(url, data, headers, onProgress) {
  const xhr = new XMLHttpRequest();
  const subject = new Subject();

  xhr.responseType = 'json';

  if (onProgress) {
    xhr.upload.addEventListener('progress', (event) => {
      onProgress(event);
    });
  }
  xhr.addEventListener('readystatechange', (event) => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        subject.next(xhr.response);
        subject.complete();
      } else {
        subject.error(event);
      }
    }
  });

  xhr.open('POST', url);
  headers.forEach((value, name) => {
    xhr.setRequestHeader(name, value);
  });
  xhr.send(data);

  return subject;
}

@Injectable()
export class ArchiveService {
  constructor(http: Http, requestService: RequestService) {
    this.api = '/archives';
    this.http = http;
    this.requestService = requestService;
  }
  getOptions() {
    return {
      headers: this.requestService.getAuthHeaders(),
    };
  }
  getAll() {
    return this.http.get(`${this.api}`).map(res => res.json());
  }
  get(id) {
    return this.http.get(`${this.api}/${id}`);
  }
  post(file, onProgress) {
    const formData = new FormData();
    formData.append('archive', file, file.name);
    return upload(`${this.api}`, formData, this.requestService.getAuthHeaders(false), onProgress);
  }
  put(archive) {
    return this.http.put(`${this.api}/${archive._id}`, archive, this.getOptions());
  }
  delete(id) {
    return this.http.delete(`${this.api}/${id}`, this.getOptions());
  }
}
