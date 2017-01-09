import { Pipe, PipeTransform } from '@angular/core';

/**
 * fontawesome icon class by file extname
 */
@Pipe({ name: 'fileIcon' })
export class FileIconPipe implements PipeTransform {
  icons = [
    { icon: 'file-archive-o', exts: ['zip', 'rar', 'tar', 'tar.gz', 'tgz'] },
    { icon: 'file-audio-o', exts: ['mp3', 'wav'] },
    { icon: 'file-video-o', exts: ['mp4', 'avi', 'rmvb', 'mkv', 'ogg'] },
    { icon: 'file-image-o', exts: ['png', 'jpg', 'gif'] },
    { icon: 'file-excel-o', exts: ['xls', 'xlsx'] },
    { icon: 'file-word-o', exts: ['doc', 'docx'] },
    { icon: 'file-powerpoint-o', exts: ['ppt', 'pptx'] },
    { icon: 'file-pdf-o', exts: ['pdf'] },
    { icon: 'file-code-o', exts: ['html', 'css', 'js', 'php', 'sh', 'json'] },
    { icon: 'file-text-o', exts: ['txt', 'md'] },
    { icon: 'file', exts: ['exe', 'msi', 'apk', 'dmg'] },
    { icon: 'file-o', exts: [''] },
  ];
  extname(filename) {
    const ext = filename.includes('.') ? filename.split('.').pop() : '';
    return ext.toLowerCase();
  }
  transform(filename) {
    const ext = this.extname(filename);
    const found = this.icons.find(d => d.exts.includes(ext));
    if (!found) {
      return this.transform('');
    }
    return `fa fa-${found.icon}`;
  }
}
