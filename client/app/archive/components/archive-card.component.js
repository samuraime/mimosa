import { Component, Input, Output, EventEmitter, ViewChild, HostListener } from '@angular/core';
import { ArchiveService } from '../services/archive.service';
import template from './archive-card.component.html';
import style from './archive-card.component.scss';

@Component({
  selector: 'mms-archive-card',
  template,
  styles: [style],
})
export class ArchiveCardComponent {
  @ViewChild('tagInput') tagInput;
  @HostListener('click') onTagInputBlurClick() {
    this.onTagInputBlur();
  }
  @Input() archive;
  @Output() close = new EventEmitter();
  constructor(archiveService: ArchiveService) {
    this.archiveService = archiveService;
    this.tagInputValue = '';
    this.tagInputVisible = false;
  }
  onClose() {
    this.close.emit();
  }
  update() {
    this.archiveService.put(this.archive).subscribe((res) => {
      console.log(res);
    });
  }
  removeTag(i) {
    this.archive.tags.splice(i, 1);
  }
  addTag() {
    if (this.tagInputValue !== '') {
      this.archive.tags.push(this.tagInputValue);
      this.tagInputValue = '';
    }
  }
  onClickAddTag(e) {
    e.stopPropagation();
    this.addTag();
    this.tagInputVisible = true;
    setTimeout(() => this.tagInput.nativeElement.focus());
  }
  onTagInputChange(e) {
    const seps = [13, 188];
    if (seps.includes(e.keyCode)) {
      e.preventDefault();
      this.addTag();
    }
  }
  onTagInputBlur() {
    this.addTag();
    this.tagInputVisible = false;
  }
}
