import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { withFetch } from '@angular/common/http';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes'; // Update path as needed

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideHttpClient(),provideHttpClient(withFetch())]
};
