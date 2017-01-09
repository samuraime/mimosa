import { LoginComponent } from './components/login.component';
import { AuthService } from './services/auth.service';
import { RequestService } from './services/request.service';
import { StorageService } from './services/storage.service';

export const AUTH_DECLARATIONS = [LoginComponent];
export const AUTH_PROVIDERS = [AuthService, RequestService, StorageService];
