import { ArchiveService } from './services/archive.service';
import { ArchiveListComponent } from './components/archive-list.component';
import { ArchiveNewComponent } from './components/archive-new.component';
import { ArchiveCardComponent } from './components/archive-card.component';

export const ARCHIVE_PROVIDERS = [ArchiveService];
export const ARCHIVE_DECLARATIONS = [ArchiveListComponent, ArchiveNewComponent, ArchiveCardComponent];
