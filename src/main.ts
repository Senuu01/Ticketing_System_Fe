import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Use provideHttpClient instead of HttpClientModule
    importProvidersFrom(ReactiveFormsModule) // Keep ReactiveFormsModule if required
  ]
}).catch(err => console.error(err));
