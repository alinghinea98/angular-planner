import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Bootstrap the Angular application with a stadalone configuration. 
// No more bootstrap module, it is directly bootstrapped with the standalone root component.

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
