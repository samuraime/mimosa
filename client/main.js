import './shim';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module.js';

platformBrowserDynamic().bootstrapModule(AppModule);
