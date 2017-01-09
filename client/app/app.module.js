import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CORE_DECLARATIONS, CORE_PROVIDERS, AppComponent } from './core';
import { AUTH_DECLARATIONS, AUTH_PROVIDERS } from './auth';
import { ARCHIVE_DECLARATIONS, ARCHIVE_PROVIDERS } from './archive';
import { COMMON_DECLARATIONS } from './common';
import routes from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  declarations: [
    CORE_DECLARATIONS,
    AUTH_DECLARATIONS,
    ARCHIVE_DECLARATIONS,
    COMMON_DECLARATIONS,
  ],
  providers: [
    CORE_PROVIDERS,
    AUTH_PROVIDERS,
    ARCHIVE_PROVIDERS,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
