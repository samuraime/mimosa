import { AppComponent } from './components/app.component';
import { NavComponent } from './components/nav.component';
import { AboutComponent } from './components/about.component';

import { LoggedInGuard } from './guards/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out.guard';

export { AppComponent };
export const CORE_DECLARATIONS = [AppComponent, NavComponent, AboutComponent];
export const CORE_PROVIDERS = [LoggedInGuard, LoggedOutGuard];
