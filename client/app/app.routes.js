import { ArchiveListComponent } from './archive/components/archive-list.component';
import { ArchiveNewComponent } from './archive/components/archive-new.component';
import { AboutComponent } from './core/components/about.component';
import { LoginComponent } from './auth/components/login.component';
import { LoggedInGuard } from './core/guards/logged-in.guard';
import { LoggedOutGuard } from './core/guards/logged-out.guard';

export default [
  { path: '', pathMatch: 'full', redirectTo: 'archive' },
  { path: 'archive', component: ArchiveListComponent },
  { path: 'new', component: ArchiveNewComponent, canActivate: [LoggedInGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
];
