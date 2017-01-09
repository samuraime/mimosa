import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { FormBuilder } from '@angular/forms';
import { ArchiveService } from '../services/archive.service';
import template from './archive-new.component.html';
import style from './archive-new.component.scss';

@Component({
  selector: 'mms-archive-new',
  template,
  styles: [style],
})
export class ArchiveNewComponent {
  @ViewChild('picker') picker;
  constructor(http: Http, builder: FormBuilder, archiveService: ArchiveService) {
    this.current = null;
    this.http = http;
    this.form = builder.group({});
    this.archiveService = archiveService;
    this.archives = [];
    this.isDragOver = false;

    document.addEventListener('drop', (e) => {
      e.preventDefault();
    }, false);
  }
  mergeArchives(newArchives) {
    newArchives.forEach((archive) => {
      if (archive.loaded === undefined) {
        archive.loaded = 0;
        archive.total = archive.size;
        archive.upload = {};
      }
    });
    this.archives = this.archives.concat(
      newArchives.filter(
        archive => !this.archives.find(
          a => ['name', 'size', 'type', 'lastModified'].every(key => archive[key] === a[key])
        )
      )
    );
  }
  onClick() {
    const pickEvent = new MouseEvent('click');
    this.picker.nativeElement.dispatchEvent(pickEvent);
  }
  onChange() {
    const newArchives = Array.from(this.picker.nativeElement.files);
    this.mergeArchives(newArchives);
  }
  onDragOver(e) {
    e.preventDefault();
    this.isDragOver = true;
  }
  onDragLeave() {
    this.isDragOver = false;
  }
  onDrop(e) {
    e.preventDefault();
    const newArchives = Array.from(e.dataTransfer.files);
    this.mergeArchives(newArchives);
  }
  upload(archive) {
    this.archiveService.post(archive, (event) => {
      archive.loaded = event.loaded;
      archive.total = event.total;
    }).subscribe((res) => {
      archive.status = 'success';
      archive.upload = res;
    }, () => {
      archive.status = 'error';
    });
  }
  onSubmit(e) {
    e.preventDefault();

    const archives = Array.from(this.archives);
    archives.forEach(archive => {
      if (archive.status !== 'success') {
        this.upload(archive);
      }
    });
  }
  edit(archive) {
    this.current = archive.upload;
  }
  removeCurrent() {
    this.current = null;
  }
  remove(archive) {
    const removeArchive = () => {
      const index = this.archives.findIndex(f => f === archive);
      this.archives.splice(index, 1);
    };
    if (archive.status === 'success') {
      if (window.confirm(`Delete "${archive.name}"?`)) {
        this.archiveService.delete(archive.upload._id)
          .subscribe(() => {
            removeArchive();
          });
      }
    } else {
      removeArchive();
    }
  }
  reupload(archive) {
    archive.status = null;
    this.upload(archive);
  }
}
