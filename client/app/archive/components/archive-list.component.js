import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ArchiveService } from '../services/archive.service';
import { AuthService } from '../../auth/services/auth.service';
import template from './archive-list.component.html';
import style from './archive-list.component.scss';

@Component({
  selector: 'mms-archive-list',
  template,
  styles: [style],
})
export class ArchiveListComponent implements OnInit {
  archives = [];
  current = null;
  search = '';
  constructor(http: Http, archiveService: ArchiveService, authService: AuthService) {
    this.http = http;
    this.archiveService = archiveService;
    this.authService = authService;
  }
  ngOnInit() {
    this.archiveService.getAll().subscribe((res) => {
      this.archives = res;
    });
  }
  select(archive) {
    if (this.authService.isLoggedIn()) {
      this.current = archive;
    }
  }
  setSearchTag(tag) {
    this.search = `:${tag}`;
  }
  remove(archive) {
    if (window.confirm(`Delete "${archive.name}"?`)) {
      this.archiveService.delete(archive._id).subscribe(() => {
        this.archives.splice(this.archives.findIndex(f => f === archive), 1);
      });
    }
  }
}
